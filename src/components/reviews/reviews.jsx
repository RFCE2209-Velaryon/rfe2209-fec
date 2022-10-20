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

const Reviews = ({product}) => {
  const [reviews, setReviews] = React.useState('');
  const [sort, setSort] = React.useState('relevant');
  const [reviewsShown, setReviewsShown] = React.useState(2);
  const [ratings, setRatings] = React.useState(null);
  const [characteristics, setCharacteristics] = React.useState(null);
  const [recommended, setRecommended] = React.useState(null);
  const [filters, setFilters] = React.useState({1: false, 2: false, 3: false, 4: false, 5: false});

  //console.log(`product from reviews component: ${JSON.stringify(product)}`);

  // when product changes,
  React.useEffect(() => {
    if(product.hasOwnProperty('id')){
      API.getReviewMeta(product.id)
        .then((metaData) => {
          setRatings(metaData.data.ratings);
          setCharacteristics(metaData.data.characteristics);
          setRecommended(metaData.data.recommended);
          setFilters({1: false, 2: false, 3: false, 4: false, 5: false});
          let totalReviews = 0;
          for(const key in metaData.data.ratings) {
            totalReviews += Number(metaData.data.ratings[key]);
          }
          //console.log(`totalreviews: ${totalReviews}`);
          API.getReviews(1, totalReviews, sort, product.id)
            .then((reviews) => {
              setReviews(reviews.data.results);
              //console.log(`metadata retrieved: ${JSON.stringify(metaData.data)}`)
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
    return (Math.floor((total / totalRatings) * 10)) / 10;
  }

  function getRatingsOfMostCommonRating() {
    let largest = 0;
    for(const key in ratings) {
      if(Number(ratings[key]) > largest) {
        largest = ratings[key];
      }
    }
    return largest;
  }

  function filterByRating(e) {
    if(!filters[Number(e.target.innerHTML.substr(0, 1))]) {
      let newFilters = Object.assign({}, filters);
      newFilters[Number(e.target.innerHTML.substr(0, 1))] = true;
      setFilters(newFilters);
    }
  }

  function unFilterByRating(e) {
    if(filters[Number(e.target.innerHTML.substr(0, 1))]) {
      let newFilters = Object.assign({}, filters);
      newFilters[Number(e.target.innerHTML.substr(0, 1))] = false;
      setFilters(newFilters);
    }
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

  return(
    <div className="ratingsAndReviews">
      <div className="leftReviews">
        <h2>Ratings & Reviews</h2>
        {ratings && <div className='averageRating'>
          <h1>{averageStarRating()}</h1>
          <StarRating initialRating={averageStarRating()} readOnly={true}/>
        </div>}
        {recommended && <h4>{`${Math.round((recommended.true / (Number(recommended.true) + Number(recommended.false))) * 100)}% of reviewers recommend this product`}</h4>}
        {ratings && <div className='ratingBreakdownList'>
          {[5, 4, 3, 2, 1].map(index => {
            return (
            <div className='ratingBreakdown' key={index}>
              <h4 onClick={filterByRating}>{`${index} stars`}</h4>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{width: `${(ratings[index]/getRatingsOfMostCommonRating())*100}%`}}></div>
              </div>
            </div>
            )
          })}
        </div>}
        <div className='filters'>
          {Object.keys(filters).map(key => {
            if(filters[key]) {
              return <div onClick={unFilterByRating} className='filter'>{key}</div>
            }
          })}
          {filtered() && <div className='filter' onClick={() => {setFilters({1: false, 2: false, 3: false, 4: false, 5: false})}}>All</div>}
        </div>
        {/* characteristic breakdown */}
      </div>
      <div className="rightReviews">
        {Array.isArray(reviews) && <div>
          <div className='reviewCount'>
            <h1>{`${getAvailableReviews().length} reviews, sorted by`}</h1>
            <DropDown cb={setSort} choices={[{label: 'Relevance', value: 'relevant'},
                                {label: 'Helpfulness', value: 'helpful'},
                                {label: 'Date', value: 'newest'}]}/>
          </div>
          <ReviewList reviews={getAvailableReviews().slice(0, reviewsShown)}/>
          {(reviewsShown < getAvailableReviews().length) && <div onClick={addReviews}>More Reviews</div>}
        </div>
        }
        {/* add review button */}
      </div>
    </div>
  )
};

export default Reviews;