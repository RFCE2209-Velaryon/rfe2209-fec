const axios = require('axios');
const API_KEY = require('../api.js');
axios.defaults.headers.common['Authorization'] = API_KEY;

const reviewsParser = (req, res, next) => {
  axios({
    method: req.method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews${req.url}`
  })
  .then(data => {
    res.status(data.status).send(data.data);
  })
};

module.exports = reviewsParser;