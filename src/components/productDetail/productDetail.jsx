import React from "react";
import ImageGallery from "./imageGallery.jsx";
import {useEffect, useState} from "react"
import CurrentSelectedStyle from "./currentSelectedStyle.jsx";
import ItemSelectors from "./stylesButtons.jsx";
import axios from 'axios';


const Product = ({prodID}) => {
const [item, setItem] = React.useState([])
console.log(item)

  const getItem = () => {
   return  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${prodID}/styles`)
  }

  useEffect(()=>{
    if(prodID){
      getItem().then((response)=>{
        console.log(response.data.results)
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
    {item[0] && <ImageGallery items={item}/>}
    {item[0] && <CurrentSelectedStyle items={item}/>}
    <ItemSelectors items={item} />
    </div>
  )
};

export default Product;