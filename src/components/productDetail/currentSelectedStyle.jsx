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


  const styles = {
    logo: {
      height: 100,
      width: 100,
      borderRadius:150,
      borderWidth: 5,
      borderColor:'white',
    }
  };


  return(
    <div>
         {items.photos.map((item)=>{
          return  <img src={item.url}  style={styles.logo} onClick={()=>(
            setImage(item.url), setDidClick(true)
          )}/>
    })}


    </div>

  )
};

export default CurrentSelectedStyle;