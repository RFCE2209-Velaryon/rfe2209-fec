import React from 'react';
import $ from 'jquery';

import Product from "./components/productDetail/productDetail.jsx"
import QuestionsAndAnswers from './components/Q&A/qna.jsx';
import Related from './components/relateANDcompare/relateANDcompare.jsx';
import Reviews from './components/reviews/reviews.jsx';
// import ProductDetail from './components/productDetailAttempt/productDetail.jsx'
import getProduct from './lib/getProduct.js';

function App () {
  const [product, setProduct] = React.useState({name:'product1'});

  // useEffect on a blank array is used to run the inside code once upon page load
  React.useEffect(() => {
    // TODO: make an API call to get one product
    getProduct()
      .then((response) => {
        setProduct(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    // TODO: make an API call to get one product
    //console.log('product: ', JSON.stringify(product))
  }, [product]);

  return (
    <div className='problemDiv'>
      <div className="header">
        <img className='headerImg' src='https://drive.google.com/uc?export=view&id=1IJ5xjs3u30HpVBDZckc0uE9A7_nJP0Zf'></img>
        <h1 className='headerText'>VAP</h1>
      </div>
      <Product product={product} />
      <Related product = {product} setProduct={setProduct}/>
      <QuestionsAndAnswers prodID={product.id} prodName={product.name}/>
      <Reviews product={product}/>
    </div>
  )
}

export default App;