import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import RelatedCard from './relatedCard.jsx';
import Outfit from './yourOutfit.jsx';

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const scollNumber = 262;
let timeout = null;
let mouseDown = false;
let startX, scrollLeft, slider;

const Related = (props) => {
  let [related, setRelated] = useState({ids: []});
  let [curProduct, setCurProduct] = useState({name:'',features:[]});
  let [needsScrolling, setNeedsScrolling] = useState(false);
  let [needsScrollRight, setNeedsScrollRight] = useState(false);
  let [needsScrollLeft, setNeedsScrollLeft] = useState(false);

  useEffect(()=>{
    if(props.product.id) {
      relatedHandler(props.product.id);
    } else {
      getProduct().then(res => {
        relatedHandler(res.data[0].id)
      });
    }
  },[props.product]);

  useEffect(()=>{
    console.log('related IDS: ',related.ids)
  },[related]);


  let getProductData = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id
    })
  }

  let relatedHandler = (id) => {
    getRelated(id).then((relRes) => {
      getProductData(id).then((proRes) => {
        let rid = [];
        relRes.data.forEach(relID=> {
          if(!rid.includes(relID)) rid.push(relID);
        })
        setRelated({ids: rid});
        setCurProduct({name: proRes.data.name, features: proRes.data.features});
      })
    })
  };

  let getRelated = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/related'
    });
  }

  let scroll = (scrollAmount) => {
    let cardsCarousel = document.getElementsByClassName('relatedCards')[0];
    cardsCarousel.scrollLeft += scrollAmount;
    arrowCheck(cardsCarousel);
  }

  let scrollCheck = () => {
    let cardsCarousel = document.getElementsByClassName('relatedCards')[0];
    if (cardsCarousel.scrollWidth > cardsCarousel.clientWidth) {
      setNeedsScrolling(true);
      arrowCheck(cardsCarousel);
    } else {
      setNeedsScrolling(false);
      setNeedsScrollLeft(false);
      setNeedsScrollRight(false);
    }
  }

  let arrowCheck = (doc) => {
    setNeedsScrollLeft(true);
    setNeedsScrollRight(true);
    if(Math.round(doc.scrollLeft) >= (doc.scrollWidth - doc.clientWidth)) {
      setNeedsScrollRight(false);
    }
    if (doc.scrollLeft === 0) {
      setNeedsScrollLeft(false);
    }
  }

  let sliderSetup = () => {
    slider = document.getElementsByClassName('relatedCards')[0];
    slider.addEventListener('mousemove', (e)=> {
      e.preventDefault();
      if(!mouseDown) {return;}
      const x = e.pageX - slider.offsetLeft;
      const scoll = x - startX;
      slider.scrollLeft = scrollLeft - scoll;
    })
    slider.addEventListener('mousedown', startDragging, false);
    slider.addEventListener('mouseup', stopDragging, false);
    slider.addEventListener('mouseleave', stopDragging, false);
  }

  let startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }
  let stopDragging = (e) => {
    mouseDown = false;
    scrollCheck()
  }

  window.addEventListener("resize", ()=>{

    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      scrollCheck()
    },300);
  });
  return(
    <>
      <h1>Related Items</h1>
      {needsScrollLeft ? (
        <div className='scrollLeft relative'>
          <button className='scrollBtn left' onClick = {(e)=>{scroll(scollNumber*-1)}}> &#60; </button>
        </div>
      ): null}
      {needsScrollRight ? (
        <div className='scrollRight relative'>
          <button className='scrollBtn right' onClick = {(e)=>{scroll(scollNumber)}}> &#62; </button>
        </div>
      ): null}
      <div className='relatedCards' onLoad={()=>{scrollCheck(); sliderSetup()}}>
        {related.ids.length>0 ? related.ids.map((id, i)=>{
          return (<RelatedCard key={i} setProduct={props.setProduct} curProduct={curProduct} productID = {id} isRelated={true} />)}) :
          <div className='cardWrapper' style={{backgroundColor:'#ccfffd'}}>
            <div className='addOutfitText'>No Related Items</div>
            <div className='addOutfitIcon' >&#9785;</div>
          </div>}
      </div>
      {props.product.id ? <Outfit setProduct={props.setProduct} productID={props.product.id}/> : null}
    </>
  )
};

export default Related;