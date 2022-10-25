import axios from 'axios';

// API sort has 'newest', 'helpful', 'relevant'

export default {
  getReviews: (page, count, sort, id) => {
    return axios({
      method: 'get',
      url: `/reviews/?page=${page}&count=${count}&sort=${sort}&product_id=${id}`
    });
  },
  getReviewMeta: (id) => {
    return axios({
      method: 'get',
      url: `/reviews/meta/?product_id=${id}`
    });
  },
  markHelpful: (reviewID) => {
    return axios({
      method: 'put',
      url: `/reviews/${reviewID}/helpful`
    });
  },
  report: (reviewID) => {
    return axios({
      method: 'put',
      url: `/reviews/${reviewID}/report`
    });
  },
};