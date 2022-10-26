const axios = require('axios');
const API_KEY = require('../api.js');
axios.defaults.headers.common['Authorization'] = API_KEY;

const relatedParser = (req, res, next) => {
  axios({
    method: req.method,
    url: req.query["api"],
    params: req.query['param']
  }).then(data=> {
    res.status(data.status).send(data.data);
  })
};

module.exports = relatedParser;