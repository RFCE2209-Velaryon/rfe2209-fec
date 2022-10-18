import axios from 'axios';

// API sort has 'newest', 'helpful', 'relevant'

export default {
  getReviews: (page, count, sort, id) => {
    return axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/?page=${page}&count=${count}&sort=${sort}&product_id=${id}`
    });
  },
  getReviewMeta: (id) => {
    return axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta/?product_id=${id}`
    });
  },
  markHelpful: (reviewID) => {
    return axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${reviewID}/helpful`
    });
  },
  report: (reviewID) => {
    return axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/${reviewID}/report`
    });
  },
};