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
  const [characterName, setCharacterName] = useState('');
  const [resultsList, setResultsList] = useState([]);

  function updateLimit() {
    if (document.getElementById("limit-box").value == null || document.getElementById("limit-box").value == '') {
      setLimit(20);
    } else {
      setLimit(document.getElementById("limit-box").value);  
    }
        
    // fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    // .then(response => response.json())
    // .then(json => {
    //   setResultsList(json.data.results);
    // })
    // .catch(error => console.log(error));
  }

  function updateOffset() {
    if (document.getElementById("offset-box").value == null) {
      setOffset(1);
    } else {
      setOffset(document.getElementById("offset-box").value);  
    }

    // fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    // .then(response => response.json())
    // .then(json => {
    //   setResultsList(json.data.results);
    // })
    // .catch(error => console.log(error));
  }

  function updateCharacterName() {
    if (document.getElementById("character-name-box").value == null) {
      setCharacterName('');
    } else {
      setCharacterName(document.getElementById("character-name-box").value);  
    }

    // fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    // .then(response => response.json())
    // .then(json => {
    //   setResultsList(json.data.results);
    // })
    // .catch(error => console.log(error));
  }

  function displayCards() {
    
    document.getElementById("card-area").innerHTML = "";
    let UrlToFetch = `${baseURL}&offset=${offset}&limit=${limit}`;

    if (characterName == null || characterName == '') {
      UrlToFetch = `${baseURL}&offset=${offset}&limit=${limit}`;
    } else {
      UrlToFetch += `&nameStartsWith=${characterName}`;
    }

    fetch(UrlToFetch)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json.data.results;
    })
    .then(list => list.map(item => {
      let newDiv = document.createElement("div");
      newDiv.className = "card-container";
      newDiv.innerHTML = `
        <p id="character-name">${item.name}</p>
        <img id="card-image" src="${item.thumbnail.path}.${item.thumbnail.extension}">
        <p id="character-description">${item.description}</p>
      `;

      document.getElementById("card-area").appendChild(newDiv);
    }))
    .catch(error => console.log(error));
  }








  // useEffect(() => {
    // console.log("use effect used");
    // fetch(`${baseURL}&offset=${offset}&limit=${limit}`)
    // .then(response => response.json())
    // .then(json => json.data.results)
    // .then(list => {
    //   list.map(item => {
    //     const imagePath = item.thumbnail.path;
    //     const imageExtension = item.thumbnail.extension;
    //     const imageFullPath = imagePath + "." + imageExtension;
    //     document.getElementById("card-image").setAttribute("src", imageFullPath);
    //     document.getElementById("card-title").innerHTML = item.name;
    //     document.getElementById("card-stories").innerHTML = item.name.toString();
    //   })
    // })
    // .catch(error => console.log(error));
  // })

  return (
    <div>
      <div id="search-container">
        <table id="search-table">
          <tbody>
            <tr>
              <th>Offset by: </th>
              <th><input id="offset-box" type="text" onChange={updateOffset} placeholder="Set Offset (min = 1)"></input></th>
            </tr>
            <tr>
              <th># of results: </th>
              <th><input id="limit-box" type="text" onChange={updateLimit} placeholder="Set Limit (max = 100)"></input></th>
            </tr>
            <tr>
              <th>Character name: </th>
              <th><input id="character-name-box" type="text" onChange={updateCharacterName} placeholder="Enter name"></input></th>
            </tr>
          </tbody>
        </table>
        <input id="search-button" type="button" onClick={displayCards} value="Search" />
      </div>

      <div id="card-area"></div>
    </div>
  )
}

export default Body;