const axios = require('axios');
const API_KEY = require('../api.js');
axios.defaults.headers.common['Authorization'] = API_KEY;

const path = require("path")
const express = require("express"); // npm installed

const relatedParser = require('./relatedParser.js');
const qnaParser = require('./qnaParser.js');
const reviewsParser = require('./reviewsParser.js');


const app = express();

app.use(express.static(path.join(__dirname, "/../dist")));
app.use(express.json());
app.use(express.urlencoded());
app.use('/related', relatedParser);
app.use('/qa', qnaParser);
app.use('/reviews', reviewsParser)
// other configuration...
//===========================================
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
//LIST QUESTIONS
app.get('/qa/questions', (req, res) => {
  return axios.get(`${apiurl}qa/questions`, {
    params: {
      product_id: Number(req.query.product_id),
      page: Number(req.query.page),
      count: Number(req.query.count)
    }
  })
    .then(response => {
      response.data.results = response.data.results.sort((a,b) => {return b.question_helpfulness - a.question_helpfulness || a.question_id - b.question_id})
      res.send(response.data.results);
    })
    .catch(error => res.send(error));
})

//LIST ANSWERS
app.get('/qa/questions/answers', (req, res) => {
  return axios.get(`${apiurl}qa/questions/${req.query.qid}/answers`, {
    params: {
      page: Number(req.query.page),
      count: Number(req.query.count)
    }
  })
    .then(response => res.send(response.data.results))
    .catch(error => res.send(error));
});

//ADD QUESTION
app.post('/qa/questions', (req, res) => {
  return axios.post(`${apiurl}qa/questions`, {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    product_id: Number(req.body.product_id)
  })
    .then(response => res.send('success'))
    .catch(error => res.send(error));
});

//ADD ANSWER
app.post('/qa/questions/answers', (req, res) => {
  return axios.post(`${apiurl}qa/questions/${req.body.qid}/answers`, {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  })
    .then((response) => res.send('success'))
    .catch(error => res.send(error));
});

//MARK Q HELPFUL
app.put('/qa/questions/helpful', (req, res) => {
  return axios.put(`${apiurl}qa/questions/${req.query.qid}/helpful`)
    .then((response) => {
      res.send('success');
    })
    .catch((err) => {
      console.log('error in QhelpHandler');
    });
})

//REPORT Q
app.put('/qa/questions/report', (req, res) => {
  return axios.put(`${apiurl}qa/questions/${req.query.qid}/report`)
    .then((response) => {
      res.send('success');
    })
    .catch((err) => {
      console.log('error in QreportHandler');
    });
});

//MARK A HELPFUL
app.put('/qa/answers/helpful', (req, res) => {
  return axios.put(`${apiurl}qa/answers/${req.query.aid}/helpful`)
    .then((response) => {
      res.send('success');
    })
    .catch((err) => {
      console.log('error in AhelpHandler');
    });
})

//REPORT A
app.put('/qa/answers/report', (req, res) => {
  return axios.put(`${apiurl}qa/answers/${req.query.aid}/report`)
    .then((response) => {
      res.send('success');
    })
    .catch((err) => {
      console.log('error in AreportHandler')
    });
});


let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});