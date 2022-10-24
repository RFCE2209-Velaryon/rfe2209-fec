import React from 'react';

import StarRating from './StarRating.jsx';

const AddAReview = ({productName, setAddingAReview, characteristics}) => {
  const [review, setReview] = React.useState({name: '', body: '', recommend: false, summary: '', Overall: 0});

  React.useEffect(() => {
    let temp = {};
    characteristics.forEach(characteristic => {
      temp[characteristic] = 0;
    });
    setReview({...temp, ... review});
  }, []);

  function handleChange(e) {
    // console.log('change was handled within addAReview');
    // console.log(e.target);
    // e.target.id && console.log(e.target.id);
    if(e.target.id === 'reviewName') {
      let tempNewReview = {...review};
      tempNewReview.name = e.target.value;
      setReview(tempNewReview);
      console.log(review);
    } else if(e.target.id === 'reviewBody') {
      console.log('review body');
    } else if(e.target.id === 'recommended') {
      console.log('review recommended');
    } else if(e.target.id === 'reviewSummary') {
      console.log('review summary');
    } else {
      //console.log('other');
    }
  }

  function onStarUpdate(num, characteristic) {
    let tempNewReview = {...review};
    tempNewReview[characteristic] = num;
    setReview(tempNewReview);
  }

  return (
    <div className="addAReviewForm">
        <h2>Write a review about your {productName}</h2>
        <div onClick={handleChange} className='row'>
          <h3>Overall Rating:</h3>
          <StarRating cb={(num) => onStarUpdate(num, 'Overall')} initialRating={0}/>
        </div>
        {characteristics.map((characteristic, i) => {
          return (
            <div onClick={handleChange} className='row' key={i}>
              <h3>{characteristic}:</h3>
              <StarRating cb={(num) => onStarUpdate(num, characteristic)} initialRating={0}/>
            </div>
          )
        })}
        <div className='row'>
          <h4>Would you recommend this product?</h4>
          <input onChange={handleChange} type='checkbox' id='recommended'></input>
        </div>
        <div>
          <h4>Summary</h4>
          <input onChange={handleChange} type='text' id='reviewSummary' placeholder='Best Purchase Ever!'></input>
        </div>
        <div>
          <h4>Body</h4>
          <input onChange={handleChange} type='textarea' id='reviewBody' placeholder='Why did you like the product or not?'></input>
          <div>{(250 - review.body.length) > 0 ? (250 - review.body.length): 0}</div>
        </div>
        <div>0-5 images</div>
        <div className='row'>
          <h4>Username</h4>
          <input onChange={handleChange} type='text' id='reviewName' placeholder='Johnson11'></input>
        </div>
        {/* 'For privacy reasons, do not use your full name or email address' */}
        <div onClick={() => setAddingAReview(false)} className="reviewFormButton">X</div>
    </div>
  )
}

export default AddAReview;