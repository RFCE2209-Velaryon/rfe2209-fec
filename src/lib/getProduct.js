import API_KEY from '../config.js';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = API_KEY;

var getProduct = () => {
  // TODO
  return axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/'
  });
};


export default getProduct;
