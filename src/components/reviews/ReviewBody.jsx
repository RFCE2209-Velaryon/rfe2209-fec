import React from 'react';

const ReviewBody = ({body}) => {
  if(body.length > 250) {
    const [hidden, setHidden] = React.useState(true);
    return (
      <div>
        <h4>{hidden ? body.slice(0, 250) + '...' : body}</h4>
        <h4 onClick={() => setHidden(!hidden)}>{hidden ? 'Show More' : 'Show Less'}</h4>
      </div>

    )
  } else {
    return (
      <h4>{body}</h4>
    )
  }
}

export default ReviewBody;