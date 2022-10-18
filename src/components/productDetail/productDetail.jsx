import React from "react";
import {useState, useEffect} from "react"
import ImageGallery from "./imageGallery.jsx";
import CurrentSelectedStyle from "./currentSelectedStyle.jsx";
import ItemSelectors from "./stylesButtons.jsx";
import axios from 'axios';


const Product = ({prodID}) => {
  const [selectedItem, setSelectedItem] = useState([])
  const [item, setItem] = useState("")
  setItem(prodID)


  if(prodID){
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${prodID}/styles`)
    .then((response)=>{
      console.log(response.data.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return(
    <div>
    <h1>Product Detail Component</h1>
    <ImageGallery />
    <CurrentSelectedStyle />
    <ItemSelectors />
    </div>

  )
};

export default Product;