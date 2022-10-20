const path = require("path")
const express = require("express"); // npm installed

const app = express();

app.use(express.static(path.join(__dirname, "/../dist")));
// other configuration...

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});