import React from 'react';

import StarRating from './StarRating.jsx';

const AddAReview = ({product, setAddingAReview, characteristics}) => {
  const [review, setReview] = React.useState({name: '', body: '', recommend: false, summary: '', Overall: 0, email: ''});

  React.useEffect(() => {
    let temp = {};
    Object.keys(characteristics).forEach(characteristic => {
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
    } else if(e.target.id === 'reviewBody') {
      let tempNewReview = {...review};
      tempNewReview.body = e.target.value;
      setReview(tempNewReview);
    } else if(e.target.id === 'recommended') {
      let tempNewReview = {...review};
      tempNewReview.recommend = !tempNewReview.recommend;
      setReview(tempNewReview);
    } else if(e.target.id === 'reviewSummary') {
      let tempNewReview = {...review};
      tempNewReview.summary = e.target.value;
      setReview(tempNewReview);
    } else if(e.target.id === 'reviewEmail') {
      let tempNewReview = {...review};
      tempNewReview.email = e.target.value;
      setReview(tempNewReview);
    } else {
      //console.log('other');
    }
  }

  function onStarUpdate(num, characteristic) {
    let tempNewReview = {...review};
    tempNewReview[characteristic] = num;
    setReview(tempNewReview);
  }

  function handleSubmit () {
    // check to make sure inputs are all valid

    // check that email is formatted correctly
    // check that body is the correct size
    // check that summary is the right size
    // check that all ratings have a star

    let temp = {};
    Object.keys(characteristics).forEach(characteristic => {
      temp[characteristics[characteristic].id] = review[characteristic];
    });

    console.log(`/reviews/?product_id=${product.id}&rating=${review.Overall}&summary=${review.summary}&body=${review.body}&recommend=${review.recommend}&name=${review.name}&email=${review.email}&photos=${'TODO'}&characteristics=${JSON.stringify(temp)}`);
    // axios({
    //   method: 'post',
    //   url: `/reviews/?product_id=${product.id}&rating=${review.Overall}&summary=${review.summary}&body=${review.body}&recommend=${review.recommend}&name=${review.name}&email=${}&photos=${}&characteristics=${}`
    // });
    //setAddingAReview(false);
  }

  return (
    <div className="addAReviewForm">
      <div className='reviewRow'>
        <h2>Write a review about your {product.name}</h2>
      </div>

        <div onClick={handleChange} className='reviewRow'>
          <h3>Overall Rating:</h3>
          <StarRating cb={(num) => onStarUpdate(num, 'Overall')} initialRating={0}/>
        </div>
        {Object.keys(characteristics).map((characteristic, i) => {
          return (
            <div onClick={handleChange} className='reviewRow' key={i}>
              <h3>{characteristic}:</h3>
              <StarRating cb={(num) => onStarUpdate(num, characteristic)} initialRating={0}/>
            </div>
          )
        })}
        <div className='reviewRow'>
          <h4>Would you recommend this product?</h4>
          <input onChange={handleChange} type='checkbox' id='recommended'></input>
        </div>
        <div className='reviewRow'>
          <h4>Summary</h4>
          <input onChange={handleChange} type='text' id='reviewSummary' placeholder='Best Purchase Ever!'></input>
        </div>
        <div className='reviewRow'>
          <h4>Body</h4>
          <input onChange={handleChange} type='textarea' id='reviewBody' placeholder='Why did you like the product or not?'></input>
          <div>{(250 - review.body.length) > 0 ? (250 - review.body.length): 0}</div>
        </div>
        <div>0-5 images</div>
        <div className='reviewRow'>
          <h4>Username</h4>
          <input onChange={handleChange} type='text' id='reviewName' placeholder='Johnson11'></input>
        </div>
        <div className='reviewRow'>
          <h4>Email</h4>
          <input onChange={handleChange} type='text' id='reviewEmail' placeholder='johnson11@gmail.com'></input>
        </div>
        {/* 'For privacy reasons, do not use your full name or email address' */}
        <div className='row'>
          <div onClick={handleSubmit} className="reviewFormButton">Submit</div>
          <div onClick={() => setAddingAReview(false)} className="reviewFormButton">Cancel</div>
        </div>
    </div>
  )
}

export default AddAReview;