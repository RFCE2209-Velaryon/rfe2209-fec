// External Libraries
import React from "react";
import axios from 'axios';
// Styles
import './reviewStyles.css';
// Link to API functions
import API_KEY from '../../config.js';
import API from './API.js';
axios.defaults.headers.common['Authorization'] = API_KEY;
// Subcomponent Imports
import ReviewList from './ReviewList.jsx';

const Reviews = ({product}) => {
  const [reviews, setReviews] = React.useState('');
  const [sort, setSort] = React.useState('relevant');

  //console.log(`product from reviews component: ${JSON.stringify(product)}`);

  // when product changes,
  React.useEffect(() => {
    if(product.hasOwnProperty('id')){
      API.getReviews(1, 200, sort, product.id)
        .then((response) => {
          setReviews(response.data.results);
          console.log(response.data.results);
        })
        .catch((err) => {
          console.log(`error from API.getReviews: ${err}`);
        })
    }
  }, [product]);

  return(
    <div className="ratingsAndReviews">
      <div className="leftReviews">
        Ratings & Reviews
      </div>
      <div className="rightReviews">
        {Array.isArray(reviews) && <ReviewList reviews={reviews}/>}
      </div>
    </div>
  )
};

export default Reviews;