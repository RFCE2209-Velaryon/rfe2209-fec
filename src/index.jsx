import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery';

import Product from './components/productDetail/productDetail.jsx';
import QuestionsAndAnswers from './components/Q&A/qna.jsx';
import Related from './components/relateANDcompare/relateANDcompare.jsx';
import Reviews from './components/reviews/reviews.jsx';

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

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />);