import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import Gallery from './gallery.jsx'
import Info from './info.jsx'
import './productStyle.css'
import Style from './styleSelect.jsx';

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const {useState, useEffect} = React;
const ProductDetail = (props) => {
  let [currentImage, setCurrentImage] = useState(0);
  let [currentStyle, setCurrentStyle] = useState(0);
  let [currentStyles, setCurrentStyles] = useState({styles: []});
  let [currentPhotos, setCurrentPhotos] = useState({photos: []});
  useEffect(()=>{
    if(props.product && props.product.id) {
      setCurrentImage(0);
      setCurrentStyle(0);
      getProductStyle(props.product.id).then(res=> {
        console.log(res);
        setCurrentStyles({styles: res.data.results});
        setCurrentPhotos({photos: res.data.results[0].photos});
      })

    }
  },[props.product]);

  let getProductStyle = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/styles'
    })
  }
  return (

    <div className='productDetailWrapper'>
      <div className='myHeader'><img className ='headerImg' src='https://drive.google.com/uc?export=view&id=1IJ5xjs3u30HpVBDZckc0uE9A7_nJP0Zf'></img></div>
      {props.product.id ? <Gallery product ={props.product} currentImage={currentImage} currentPhotos={currentPhotos} setCurrentImage={setCurrentImage}/> : null}
      <div className='detailWrapper'>
        {props.product.id ? <Info product = {props.product} /> : null}
        {currentStyles.styles.length ? <Style product = {props.product} currentStyles={currentStyles} setCurrentPhotos={setCurrentPhotos} setCurrentImage={setCurrentImage} currentStyle={currentStyle} setCurrentStyle={setCurrentStyle}/> : null}
      </div>
    </div>
  );
}

export default ProductDetail;