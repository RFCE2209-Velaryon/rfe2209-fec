import React from "react";
import {useState, useEffect} from "react"





const CurrentSelectedStyle = ({items, image, setImage, didClick, setDidClick}) => {



 const display = ()=> {
  if(image.split('').length === 0){
    setImage(items.photos[0].url)
  }


 }


 useEffect(()=>{
  display()
 })





  return(
    <div className="c-thumbnail" >
         {items.photos.map((item)=>{
          return  <img  className="circle-thumbnail" src={item.url}   onClick={()=>(
            setImage(item.url), setDidClick(true)
          )}/>
    })}


    </div>

  )
};

export default CurrentSelectedStyle;