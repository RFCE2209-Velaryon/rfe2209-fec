import React from "react";
import './reviewStyles.css';
import API_KEY from '../../config.js';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = API_KEY;

const Reviews = ({product}) => {
  const [reviews, setReviews] = React.useState('');

  console.log(`product from reviews component: ${JSON.stringify(product)}`);

  var getReviews = (page) => {
    return axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/?page=1&count=2&sort=newest&product_id=37311`
    });
  };

  React.useEffect(() => {
    if(product.hasOwnProperty('id')){
      getReviews(1)
      .then((response) => {
        setReviews(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [product]);

  return(
    <div className="ratingsAndReviews">
      <div className="leftReviews">
        Ratings & Reviews
      </div>
      <div className="rightReviews">
        filler
      </div>
    </div>
  )
};

export default Reviews;