const path = require("path")
const express = require("express"); // npm installed

const relatedParser = require('./relatedParser.js');
const qnaParser = require('./qnaParser.js');
const reviewsParser = require('./reviewsParser.js');


const app = express();

app.use(express.static(path.join(__dirname, "/../dist")));
app.use('/related', relatedParser);
app.use('/qa/questions', qnaParser);
app.use('/reviews', reviewsParser)
// other configuration...

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});