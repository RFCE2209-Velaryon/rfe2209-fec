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
import DropDown from './DropDown.jsx';
import StarRating from './StarRating.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import Characteristic from './Characteristic.jsx';
import AddAReview from './AddAReview.jsx';

const Reviews = ({product}) => {
  const [reviews, setReviews] = React.useState('');
  const [sort, setSort] = React.useState('relevant');
  const [reviewsShown, setReviewsShown] = React.useState(2);
  const [ratings, setRatings] = React.useState(null);
  const [characteristics, setCharacteristics] = React.useState(null);
  const [recommended, setRecommended] = React.useState(null);
  const [filters, setFilters] = React.useState({1: false, 2: false, 3: false, 4: false, 5: false});
  const [addingAReview, setAddingAReview] = React.useState(false);

  //console.log(`product from reviews component: ${JSON.stringify(product)}`);

  // when product changes,
  React.useEffect(() => {
    if(product.hasOwnProperty('id')){
      API.getReviewMeta(product.id)
        .then((metaData) => {
          setRatings(metaData.data.ratings);
          setCharacteristics(metaData.data.characteristics);
          setRecommended(metaData.data.recommended);
          let totalReviews = 0;
          for(const key in metaData.data.ratings) {
            totalReviews += Number(metaData.data.ratings[key]);
          }
          //console.log(`totalreviews: ${totalReviews}`);
          API.getReviews(1, totalReviews, sort, product.id)
            .then((reviews) => {
              setReviews(reviews.data.results);
              //console.log(`metadata retrieved: ${JSON.stringify(metaData.data.characteristics)}`)
              //console.log(`reviews retrieved: ${JSON.stringify(reviews.data.results)}`);
            })
            .catch((err) => {
              console.log(`error from API.getReviews: ${err}`);
            })
        })
        .catch((err) => {
          console.log(`error from API.getReviewMeta: ${err}`);
        })
    }
  }, [product, sort]);

  function addReviews() {
    setReviewsShown(reviewsShown + 2);
  }

  function averageStarRating() {
    let total = 0;
    let totalRatings = 0;
    for(const key in ratings) {
      totalRatings += Number(ratings[key]);
      total += Number(ratings[key]) * Number(key);
    }
    return (Math.round((total / totalRatings) * 10)) / 10;
  }

  function filtered() {
    let filtersApplied = false;
    Object.keys(filters).forEach(key => {
      filtersApplied = filters[key] || filtersApplied;
    });
    return filtersApplied;
  }

  function getAvailableReviews() {
    if(!filtered()) {
      return reviews;
    } else {
      return reviews.filter(review => {
        return filters[review.rating];
      });
    }
  }

  function unFilterByRating(e) {
    if(filters[Number(e.target.innerHTML.substr(0, 1))]) {
      let newFilters = Object.assign({}, filters);
      newFilters[Number(e.target.innerHTML.substr(0, 1))] = false;
      setFilters(newFilters);
    }
  }

  function getShownReviews() {
    return getAvailableReviews().slice(0, reviewsShown);
  }

  return(
    <div className="ratingsAndReviews">
      <div key={1} className="leftReviews">
        <h2>Ratings & Reviews</h2>
        {ratings && <div className='averageRating'>
          <h1>{averageStarRating()}</h1>
          <StarRating initialRating={averageStarRating()} readOnly={true}/>
        </div>}
        {recommended && <h4>{`${Math.round((recommended.true / (Number(recommended.true) + Number(recommended.false))) * 100)}% of reviewers recommend this product`}</h4>}
        {ratings && <RatingBreakdown ratings={ratings} filters={filters} setFilters={setFilters}/>}
        <div className='filters'>
          {Object.keys(filters).map(key => {
            if(filters[key]) {
              return <div onClick={unFilterByRating} className='filter'>{key}</div>
            }
          })}
          {filtered() && <div className='filter' onClick={() => {setFilters({1: false, 2: false, 3: false, 4: false, 5: false})}}>All</div>}
        </div>
        {characteristics && <div className='characteristicBreakdownList'>
            {Object.keys(characteristics).map((key, i) => {
              //console.log(`key: ${key}, value: ${JSON.stringify(characteristics[key])}`);
              return <Characteristic key={i} characteristic={key} value={characteristics[key].value} />;
            })}
          </div>}
      </div>
      <div key={2} className="rightReviews">
        {Array.isArray(reviews) && <div className='rightReviewsContainer'>
          <div>
            <div className='reviewCount'>
              <h1>{`${getAvailableReviews().length} reviews, sorted by`}</h1>
              <DropDown cb={setSort} choices={[{label: 'Relevance', value: 'relevant'},
                                  {label: 'Helpfulness', value: 'helpful'},
                                  {label: 'Date', value: 'newest'}]}/>
            </div>
            <ReviewList reviews={getShownReviews()}/>
          </div>
          <div className='bottomRightButtons'>
            {(reviewsShown < getAvailableReviews().length) && <div className='bottomRightButton'onClick={addReviews}>More Reviews</div>}
            <div className='bottomRightButton' onClick={() => setAddingAReview(true)}>Add a Review +</div>
          </div>
        </div>
        }
        {/* add review button */}
      </div>
      {addingAReview && <AddAReview productName={product.name} characteristics={Object.keys(characteristics)} setAddingAReview={setAddingAReview}/>}
    </div>
  )
};

export default Reviews;