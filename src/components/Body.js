import React, {useState, useEffect} from 'react';
var CryptoJS = require("crypto-js"); // same as import CryptoJS from "crypto-js";

const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY;
const ts = new Date();

var message = ts+privateKey+publicKey;
const hash = CryptoJS.MD5(message);





function Body() {
  const [character, setCharacter] = useState('');
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(570);
  const [limit, setLimit] = useState(20);

  function updateLimit() {
    const limit = document.getElementById("limit-box").value;
    setLimit(limit);
    console.log(limit);
  }

  function updateOffset() {
    const offset = document.getElementById("offset-box").value;
    setOffset(offset);
    console.log(offset);
  }

  useEffect(() => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(json => {
      const index = 12;
      const imagePath = json.data.results[index].thumbnail.path;
      const imageExtension = json.data.results[index].thumbnail.extension;
      const imageFullPath = imagePath + "." + imageExtension;

      document.getElementById("card-image").setAttribute("src", imageFullPath);
      document.getElementById("card-title").innerHTML = json.data.results[index].name;
      document.getElementById("card-stories").innerHTML = json.data.results[index].stories.items[0].name.toString();
    })
    .catch(error => console.log(error));

    document.title = `You clicked ${count} times`;
  })

  return (
    <div>
      <div>
        <input id="search-box" type="text" placeholder="Find Marvel Character"></input>
        <input id="offset-box" type="text" onChange={updateOffset} placeholder="Set Offset"></input>
        <input id="limit-box" type="text" onChange={updateLimit} placeholder="Set Limit"></input>
      </div>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    </div>
  )
}

// function getCharacter() {
//   var apikey = "b0ee1b544c9692bdc5fd1c90a64d4c73";
//   var pvtkey = "ca2939553164aea5e3a8612298e4f8bd86b44002";
//   var ts = new Date().getTime();


//   var message = ts+pvtkey+apikey;
//   var a = CryptoJS.MD5(message);
//   pm.environment.set("hash", a.toString())

//   console.log(pm.environment.get("apikey"));
//   console.log(pm.environment.get("ts"));
//   console.log(pm.environment.get("hash"));
//   fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=b0ee1b544c9692bdc5fd1c90a64d4c73&hash={hash}}&ts={{ts}}')
// }

export default Body;