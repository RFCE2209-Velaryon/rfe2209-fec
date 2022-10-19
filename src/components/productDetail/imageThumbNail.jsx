import React from "react";
import {useState, useEffect} from "react"




const ImageThumbnail= ({items, image, setImage, didClick, setDidClick}) => {



 const displayThumb = ()=> {
  if(image.split('').length === 0){
    setImage(items.photos[0].url)
  }


 }


 useEffect(()=>{
  displayThumb()
 })


  const styles = {
    logo: {
      height: 100,
      width: 100,
      borderWidth: 5,
      borderColor:'white',
    }
  };


  return(
    <div>
         {items.photos.map((item)=>{
          return  <ul>
              <img src={item.url}  style={styles.logo} onClick={()=>(
            setImage(item.url), setDidClick(true)
          )}/>
          </ul>
    })}
    </div>

  )
};

export default ImageThumbnail;