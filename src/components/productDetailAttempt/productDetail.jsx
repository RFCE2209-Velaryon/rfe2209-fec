import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import Gallery from './gallery.jsx'
import Info from './info.jsx'
import './productStyle.css'

const ProductDetail = (props) => {
  return (

    <div className='productDetailWrapper'>
      {props.product.id ? <Gallery product ={props.product}/> : null}
      <div className='detailWrapper'>
        {props.product.id ? <Info product = {props.product} /> : null}
      </div>
    </div>
  );
}

export default ProductDetail;