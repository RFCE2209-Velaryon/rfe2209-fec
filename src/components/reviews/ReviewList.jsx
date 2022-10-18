import React from 'react';
import Review from './review.jsx';

const ReviewList = ({reviews}) => {
  return (
    <div className="reviewList">
      {reviews.map((review, i) => {
        return <Review key={i} review={review}/>;
      })}
    </div>
  )
}

export default ReviewList;