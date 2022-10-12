import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Reviews from './components/reviews/reviews.jsx';
import Products from './components/productDetail/productDetail.jsx';

function App () {
  return (
    <div>
      Hello
      <Products/>
      <Reviews />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));