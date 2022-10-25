import React from "react";
import ImageGallery from "./imageGallery.jsx";
import {useEffect, useState} from "react"
import CurrentSelectedStyle from "./currentSelectedStyle.jsx";
import ItemSelectors from "./stylesButtons.jsx";
import ImageThumbnail from "./imageThumbNail.jsx";

import axios from 'axios';
import "./stylesProduct.css"



const Product = ({prodID, prod}) => {
const [item, setItem] = useState([])
const [allProds, setAllProds] = useState([])
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
    <section  className="container">
    {item[0] && <ImageGallery items={item[0]}image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick}/>}
    <h2>Product Sloagan: {prod.slogan}</h2>
    <h2>Description</h2>
    <h4>{prod.description}</h4>
    {item[0] && <CurrentSelectedStyle items={item[0]} image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick} prod={prod}/>}
    {item[0] && <ImageThumbnail items={item[0]} image={image} setImage={setImage} didClick={didClick} setDidClick={setDidClick}/>}
    {item[0] && <ItemSelectors items={item[0]}  prod={prod}/>}
    </section>
  )
};

export default Product;