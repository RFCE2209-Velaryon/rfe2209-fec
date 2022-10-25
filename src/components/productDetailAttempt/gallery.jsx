import React from "react";
import axios from 'axios';
import './productStyle.css';

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Gallery = (props) => {
  let [currentImage, setCurrentImage] = useState(0);
  let [currentPhotos, setCurrentPhotos] = useState({photos: []});
  useEffect(()=>{
    getProductStyle(props.product.id).then(res=> {
      console.log(res);
      setCurrentPhotos({photos: res.data.results[0].photos});
    })
  },[props.product]);

  useEffect(()=> {
    console.log(currentPhotos);
  },[currentPhotos]);

  let getProductStyle = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/styles'
    })
  }
  return (
    <>
    <div className='galleryWrapper'>
      <div className='mainImgWrapper'>
        {currentPhotos.photos.length ? <img className ='mainImg' src={currentPhotos.photos[currentImage].url}></img>:null}
      </div>
      <div className='thumbnailWrapper'>
        {currentPhotos.photos.length ? currentPhotos.photos.map((photo,i)=>{
          return (<img key={i} onClick={(e)=>{setCurrentImage(i)}} thumbID={i} className='thumbnailMain' src={photo.thumbnail_url}></img>)
        }) : null}
      </div>

    </div>
    </>
  );
}



export default Gallery;