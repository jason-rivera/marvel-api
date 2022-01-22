import React, {useState, useEffect} from 'react';
import '../assets/Body.css';
var CryptoJS = require("crypto-js"); // same as import CryptoJS from "crypto-js";

const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY;
const ts = new Date();
var message = ts+privateKey+publicKey;
const hash = CryptoJS.MD5(message);
const baseURL = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`;

function Body() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [resultsList, setResultsList] = useState([]);

  function updateLimit() {
    const limit = document.getElementById("limit-box").value;
    setLimit(limit);
    fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      setResultsList(json.data.results);
    })
    .catch(error => console.log(error));
  }

  function updateOffset() {
    const offset = document.getElementById("offset-box").value;
    setOffset(offset);
    fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      setResultsList(json.data.results);
    })
    .catch(error => console.log(error));
  }

  function displayCards() {
    document.getElementById("card-area").innerHTML = "";

    fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      setResultsList(json.data.results);
      console.log(json);
    })
    .then(resultsList.map(item => {
      let newDiv = document.createElement("div");

      newDiv.innerHTML = `
        <p>${item.name}</p>
        <img id="card-image" src="${item.thumbnail.path}.${item.thumbnail.extension}">

      `;
      document.getElementById("card-area").appendChild(newDiv);
    }))
    .catch(error => console.log(error));
  }








  useEffect(() => {
    console.log("use effect used");
    fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(json => json.data.results)
    .then(list => {
      list.map(item => {
        const imagePath = item.thumbnail.path;
        const imageExtension = item.thumbnail.extension;
        const imageFullPath = imagePath + "." + imageExtension;
        document.getElementById("card-image").setAttribute("src", imageFullPath);
        document.getElementById("card-title").innerHTML = item.name;
        document.getElementById("card-stories").innerHTML = item.name.toString();
      })
    })
    .catch(error => console.log(error));
  })

  return (
    <div>
      <div id="search-container">
        <table id="search-table">
          <tr>
            <th>Offset by: </th>
            <th><input id="offset-box" type="text" onChange={updateOffset} placeholder="Set Offset"></input></th>
          </tr>
          <tr>
            <th># of results: </th>
            <th><input id="offset-box" type="text" onChange={updateLimit} placeholder="Set Limit"></input></th>
          </tr>
        </table>
        <input id="search-button" type="button" onClick={displayCards} value="Search" />
      </div>

      <div id="card-area">-</div>
    </div>
  )
}

export default Body;