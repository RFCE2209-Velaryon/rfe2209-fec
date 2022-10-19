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
  const [reviewsShown, setReviewsShown] = React.useState(2);
  const [ratings, setRatings] = React.useState('');
  const [characteristics, setCharacteristics] = React.useState('');

  //console.log(`product from reviews component: ${JSON.stringify(product)}`);

  // when product changes,
  React.useEffect(() => {
    if(product.hasOwnProperty('id')){
      API.getReviewMeta(product.id)
        .then((metaData) => {
          setRatings(metaData.data.ratings);
          setCharacteristics(metaData.data.characteristics);
          let totalReviews = 0;
          for(const key in metaData.data.ratings) {
            totalReviews += Number(metaData.data.ratings[key]);
          }
          //console.log(`totalreviews: ${totalReviews}`);
          API.getReviews(1, totalReviews, 'relevant', product.id)
            .then((reviews) => {
              setReviews(reviews.data.results);
              console.log(reviews.data.results);
            })
            .catch((err) => {
              console.log(`error from API.getReviews: ${err}`);
            })
        })
        .catch((err) => {
          console.log(`error from API.getReviewMeta: ${err}`);
        })
    }
  }, [product]);

  function addReviews() {
    setReviewsShown(reviewsShown + 2);
  }

  return(
    <div className="ratingsAndReviews">
      <div className="leftReviews">
        Ratings & Reviews
        {/* overall rating & stars */}
        {/* rating breakdown */}
        {/* characteristic breakdown */}
      </div>
      <div className="rightReviews">
        {/* total reviews, sorted by dropdown */}
        {Array.isArray(reviews) && <ReviewList reviews={reviews.slice(0, reviewsShown)}/>}
        {Array.isArray(reviews) && (reviewsShown < reviews.length) && <div onClick={addReviews}>More Reviews</div>}
        {/* add review button */}
      </div>
    </div>
  )
};

export default Reviews;