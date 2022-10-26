import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import Gallery from './gallery.jsx'

const ProductDetail = (props) => {
  return (
    <>
    {props.product.id ? <Gallery product ={props.product}/> : null}
    </>
  );
}

export default ProductDetail;