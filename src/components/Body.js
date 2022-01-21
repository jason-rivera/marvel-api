
var CryptoJS = require("crypto-js");

const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY;
const ts = new Date();

var message = ts+privateKey+publicKey;
const hash = CryptoJS.MD5(message);

fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`).then(response => response.json()).then(json => console.log(json));

console.log("cool");

function Body() {
  return (
    <div>
      
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