import React from 'react';
import Review from './review.jsx';

const ReviewList = ({reviews}) => {
  return (
    <div className="reviewList">
      {reviews.map((review, i) => {
        return (
          <div key={review.review_id}>
            <Review review={review}/>
            {!(i === (reviews.length - 1)) && <div className='reviewSeperator'></div>}
          </div>
        )
      })}
    </div>
  )
}

export default ReviewList;