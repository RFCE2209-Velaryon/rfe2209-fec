import React from "react";
import {useState, useEffect} from "react"

const ImageGallery = ({items, image, setImage, didClick, setDidClick, product}) => {
const [imageArray, setImageArray] = useState([])
const [nextImage, setNextImage] = useState(0)
const [zoom, setZoom] = useState(false)
const [magnifiy, setMagnify] = useState({width: '600px'})
const isZoomed = () => {
  if(zoom === false){
    setMagnify({width: '600px'})
    setZoom(true)
  } else if (zoom === true){
    setMagnify({backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'})
    setZoom(false)
  }
}

let nextImageButtonHandler  = () => {
  if(nextImage  < imageArray.length - 1){
    setNextImage(nextImage + 1)
  } else if (nextImage === imageArray.length -1){
    setNextImage(0)
  }
}

let previousImageButtonHandler  = () => {
  if(nextImage  > 0){
    setNextImage(nextImage - 1)
  } else if (nextImage === 0){
    setNextImage(0)
  }
}


  const getPictures = () => {
    let pics = []
    if(items.photos.length > 0){
      items.photos.map((photo)=>{
       pics.push(photo.url)
      })
    }
    setImageArray(pics)
  }

useEffect(()=>{
  getPictures()
},[product])


  return(
    <div  className="mainImgWrapper">
      {didClick ? <img src={image} className="main-image" style={magnifiy}/> :
       <img src={imageArray[nextImage]} className="main-image" alt="thumbnail" style={magnifiy}
       />}
    <button  className="carousel-button prev" onClick={()=>{
        previousImageButtonHandler(), setDidClick(false)
      }}>&#8656;</button>
      <button   className="carousel-button next" onClick={()=>{
        nextImageButtonHandler(), setDidClick(false)}}>&#8658;</button>
        <button className="zoom-button" onClick={()=>{isZoomed()}}>&#x21d4;zoom</button>
    </div>

  )
};

export default ImageGallery;