import React from "react";
import {useState, useEffect} from "react"




const ImageGallery = ({items, image, setImage, didClick, setDidClick}) => {
const [imageArray, setImageArray] = useState([])
const [nextImage, setNextImage] = useState(0)
const [zoom, setZoom] = useState(false)
const [magnifiy, setMagnify] = useState({width: '600px'})
console.log(magnifiy)


const carouselButton ={
  position: "absolute",
  Zindex: 2,
  backGround: 'none',
  fontSize: '4rem',
  top: '50%',
  transform: `translateY(${-50})`,
  color:'rgba(255,255,255, .5)',
  cursor: 'pointer',
  borderRadius: '.25rem',
  padding: '0.5rem',
  backgroundColor: 'rgba(0,0,0,.1)'

}

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

      {didClick ? <img src={image} alt="thumbnail" style={magnifiy}/> :
       <img src={imageArray[nextImage]} alt="thumbnail" style={magnifiy}/>}
    <button  className="carousel-button prev" onClick={()=>{
        setNextImage(nextImage -1), setDidClick(false)
      }}>&#8656;</button>
      <button  className="carousel-button next" onClick={()=>{
        setNextImage(nextImage +1), setDidClick(false)}}>&#8658;</button>
        <button onClick={()=>{isZoomed()}}>zoom</button>
    </div>

  )
};

export default ImageGallery;