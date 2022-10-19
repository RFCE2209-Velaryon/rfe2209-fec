import React from "react";
import ImageGallery from "./imageGallery.jsx";
import {useEffect, useState} from "react"
import CurrentSelectedStyle from "./currentSelectedStyle.jsx";
import ItemSelectors from "./stylesButtons.jsx";
import ImageThumbnail from "./imageThumbNail.jsx";

import axios from 'axios';
import "./stylesProduct.css"



const Product = ({prodID}) => {
const [item, setItem] = useState([])
const [image, setImage] = useState('')
const [didClick, setDidClick] = useState(true)


  const getItem = () => {
   return  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${prodID}/styles`)
  }

  useEffect(()=>{
    if(prodID){
      getItem().then((response)=>{
        setItem(response.data.results)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }, [prodID])



  return(
    <div>
    <h1>Product Detail Component</h1>
    {item[0] && <ImageGallery items={item[0]}image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick}/>}
    {item[0] && <CurrentSelectedStyle items={item[0]} image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick}/>}
    {item[0] && <ImageThumbnail items={item[0]} image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick}/>}
    {item[0] && <ItemSelectors items={item[0]} />}
    </div>
  )
};

export default Product;