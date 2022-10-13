import React from 'react';
import $ from 'jquery';

import Product from './components/productDetail/productDetail.jsx';
import QuestionsAndAnswers from './components/Q&A/qna.jsx';
import Related from './components/relateANDcompare/relateANDcompare.jsx';
import Reviews from './components/reviews/reviews.jsx';
import Products from './components/productDetail/productDetail.jsx';

function App () {
  const [product, setProduct] = React.useState({name:'product1'});

  // useEffect on a blank array is used to run the inside code once upon page load
  React.useEffect(() => {
    // TODO: make an API call to get one product
  }, []);

  return (
    <div>
      <Product />
      <Related />
      <QuestionsAndAnswers />
      <Reviews />
    </div>
  )
}

export default App;