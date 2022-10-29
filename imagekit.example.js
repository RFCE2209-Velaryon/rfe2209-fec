var ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: "YOUR_PUBLIC_KEY",
  privateKey: "YOUR_PRIVATE_KEY",
  urlEndpoint: "YOUR_URL_ENDPOINT"
});
module.exports = imagekit;