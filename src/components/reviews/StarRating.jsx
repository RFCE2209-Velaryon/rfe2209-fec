import React from 'react';

const StarRating = ({initialRating, readOnly}) => {
  const [rating, setRating] = React.useState(initialRating);
  const [hover, setHover] = React.useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              if(!readOnly) {
                setRating(index);
              }
            }}
            onMouseEnter={() => {
              if(!readOnly) {
                setHover(index);
              }
            }}
            onMouseLeave={() => {
              if(!readOnly) {
                setHover(rating);
              }
            }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;