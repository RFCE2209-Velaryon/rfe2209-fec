import React from 'react';
import API from './API.js';
import Rating from '@mui/material/Rating';

const Review = ({review}) => {
  const [reported, setReported] = React.useState(false);
  const [markedHelpful, setMarkedHelpful] = React.useState(false);

  function onHelpful() {
    if(!markedHelpful) {
      setMarkedHelpful(true);
      review.helpfulness++;
      API.markHelpful(review.review_id)
        .then((response) => console.log(`successfully marked review helpful`))
        .catch((err) => console.log(`err marking helpful: ${err}`))
    }
  }
  function onReport() {
    if(!reported) {
      setReported(true);
      API.report(review.review_id)
        .then((response) => console.log(`successfully reported review`))
        .catch((err) => console.log(`err reporting review: ${err}`))
    }
  }

  return (
    <div className="review">
      <div className="reviewHeader">
        {/* star rating */}
        <Rating name="read-only" value={review.rating} readOnly />
        {/* verified purchase star */}
        {/* Username, date */}
      </div>
      {/* Review Title */}
      <h2>{review.summary}</h2>
      {/* Review Body */}
      <h4>{review.body}</h4>
      {/* Recommendation */}
      {review.recommend && <h4 className='reviewRecommendation'>I recommend this product</h4>}
      {/* Seller Response */}
      {review.response && <h4 className='sellerResponse'>{`Response:\n${review.response}`}</h4>}
      <div className="reviewFooter">
        {/* Helpful? Yes(x) */}
        <div>Helpful?</div>
        <div onClick={onHelpful}>Yes({review.helpfulness})</div>
        <div>|</div>
        <div onClick={onReport}>Report</div>
        {/* Report */}
      </div>
    </div>
  )
}

export default Review;