import React from "react";
import getProduct from '../../lib/getProduct.js';
import ImageGallery from "./imageGallery.jsx";
import {useEffect, useState} from "react"
import CurrentSelectedStyle from "./currentSelectedStyle.jsx";
import ItemSelectors from "./stylesButtons.jsx";
import ImageThumbnail from "./imageThumbNail.jsx";
import Info from './info.jsx'
import axios from 'axios';
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
import "./stylesProduct.css"



const Product = ({product}) => {
const [item, setItem] = useState([])
const [allProds, setAllProds] = useState([])
const [image, setImage] = useState('')
const [didClick, setDidClick] = useState(true)
const [didHover, setDidHover] = useState(true)


  useEffect(()=>{
    if(product && product.id ){
      getProductStyle(product.id).then((response)=>{
        setItem(response.data.results)
        setImage(response.data.results[0].photos[0].url)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }, [product])

  let getProductStyle = (id) => {
 return  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/styles`)
  }

  return(
    <div>
    <section  className='productDetailWrapper'>
    {item[0] && <ImageGallery items={item[0]}image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick} product={product}/>}
    {item[0] && <ImageThumbnail items={item[0]} image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick} didHover={didHover} setDidHover={setDidHover}/>}
    <div className='detailWrapper'>
    {item[0] && <Info product = {product} items={item[0]} /> }
    {item[0] && <CurrentSelectedStyle items={item[0]} image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick} product={product} didClick={didHover} setDidHover={setDidHover}/>}
    {item[0] && <ItemSelectors items={item[0]}  product={product}/>}
    </div>
    </section>
     <div className="productDecriptionlWrapper">
     <h1>PRODUCT DECRIPTION</h1>
     <p>{product.description}</p>
  </div>
  </div>
  )
};

export default Product;