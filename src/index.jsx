import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Reviews from './components/reviews/reviews.jsx';

function App () {
  return (
    <div>
      Hello
      <Reviews />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));