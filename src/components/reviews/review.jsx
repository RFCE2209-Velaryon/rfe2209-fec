import React from 'react';
import { format, parseISO } from "date-fns";

import API from './API.js';
import StarRating from './StarRating.jsx';
import ImgModal from './ImgModal.jsx';
import ReviewBody from './ReviewBody.jsx';

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
        {review.rating && <StarRating initialRating={review.rating} readOnly={true} />}
        <div className='reviewUser'>
          {/* verified purchase star */}
          {review.reviewer_name && <div>{review.reviewer_name}</div>}
          <div>-</div>
          {review.date && <div>{format(parseISO(review.date), 'MMMM d, yyyy')}</div>}
        </div>
      </div>
      <h2>{review.summary}</h2>
      <ReviewBody body={review.body}/>
      <div className="reviewImagesContainer">
        {review.photos && review.photos.map((photo, i) => {
          return(
            <ImgModal key={i} photo={photo}/>
          )
        })}
      </div>
      {review.recommend && <h4 className='reviewRecommendation'>I recommend this product</h4>}
      {review.response && <h4 className='sellerResponse'>{`Response:\n${review.response}`}</h4>}
      <div className="reviewFooter">
        <div>Helpful?</div>
        <div onClick={onHelpful}>Yes({review.helpfulness})</div>
        <div>|</div>
        <div onClick={onReport}>Report</div>
      </div>
    </div>
  )
}

export default Review;