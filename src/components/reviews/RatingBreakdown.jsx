import React from 'react';

const RatingBreakdown = ({ratings, filters, setFilters}) => {
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

  function filtered() {
    let filtersApplied = false;
    Object.keys(filters).forEach(key => {
      filtersApplied = filters[key] || filtersApplied;
    });
    return filtersApplied;
  }

  return (
    <div className='ratingBreakdownList'>
      {[5, 4, 3, 2, 1].map(index => {
        return (
        <div className='ratingBreakdown' key={index}>
          <h4 className='ratingBreakdownLabel' onClick={filterByRating}>{`${index} stars`}</h4>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: `${(ratings[index]/getRatingsOfMostCommonRating())*100}%`}}></div>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default RatingBreakdown;