import React from "react";
import {useState, useEffect} from "react"




const ImageGallery = ({items, image, setImage, didClick, setDidClick}) => {
const [imageArray, setImageArray] = useState([])
const [nextImage, setNextImage] = useState(0)
const [zoom, setZoom] = useState(false)
const [magnifiy, setMagnify] = useState({width: '600px'})



const isZoomed = () => {
  if(zoom === false){
    setMagnify({width: '600px'})
    setZoom(true)
  } else if (zoom === true){
    setMagnify({width: '1500px'})
    setZoom(false)
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
},[])


  return(
    <div>

      {didClick ? <img src={image} className="main-image" style={magnifiy}/> :
       <img src={imageArray[nextImage]} className="main-image" alt="thumbnail" style={magnifiy}/>}
    <button  className="carousel-button prev" onClick={()=>{
        setNextImage(nextImage -1), setDidClick(false)
      }}>&#8656;</button>
      <button   className="carousel-button next" onClick={()=>{
        setNextImage(nextImage +1), setDidClick(false)}}>&#8658;</button>
        <button className="zoom-button" onClick={()=>{isZoomed()}}>&#x21d4;zoom</button>
    </div>

  )
};

export default ImageGallery;