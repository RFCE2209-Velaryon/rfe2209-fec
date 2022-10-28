import React from "react";
import './productStyle.css';

const Gallery = (props) => {

  return (
    <>
    <div className='galleryWrapper'>
      <div className='mainImgWrapper'>
        {props.currentPhotos.photos.length ? <img className ='mainImg' src={props.currentPhotos.photos[props.currentImage].url}></img>:null}
      </div>
      <div className='thumbnailWrapper'>
        {props.currentPhotos.photos.length ? props.currentPhotos.photos.map((photo,i)=>{
          return (<img key={i} onClick={(e)=>{props.setCurrentImage(i)}} className='thumbnailMain' style={{border: props.currentImage === i ? 'solid .25em #20c0ff':''}}src={photo.thumbnail_url}></img>)
        }) : null}
      </div>

    </div>
    </>
  );
}



export default Gallery;