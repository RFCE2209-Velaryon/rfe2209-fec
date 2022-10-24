import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import RelatedCard from './relatedCard.jsx'

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const scollNumber = 262;
let timeout = null;
const Outfit = (props) => {
  let [related, setRelated] = useState([]);
  let [curProduct, setCurProduct] = useState({name:'',features:[]});
  let [outfitID, setOutfitID] = useState([]);
  let [needsScrolling, setNeedsScrolling] = useState(false);
  let [needsScrollRight, setNeedsScrollRight] = useState(false);
  let [needsScrollLeft, setNeedsScrollLeft] = useState(false);

  useEffect(()=>{
    if(props.productID) {
      setOutfitIDs(props.productID);
    } else {
      console.log('productID missing');
    }
  },[]);

  let getProductData = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id
    })
  }

  let relatedHandler = (id) => {
    getRelated(id).then((relRes) => {
      getProductData(id).then((proRes) => {
        console.log('relatedIDs: ', relRes.data);
        setRelated(relRes.data);
        setCurProduct({name: proRes.data.name, features: proRes.data.features});

      })
    })
  };

  let setOutfitIDs = (ids) => {
    setOutfitID(ids);
  }

  let getRelated = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/related'
    });
  }

  let scroll = (scrollAmount) => {
    let cardsCarousel = document.getElementsByClassName('outfitCards')[0];
    cardsCarousel.scrollLeft += scrollAmount;
    arrowCheck(cardsCarousel);
  }

  let scrollCheck = () => {
    let cardsCarousel = document.getElementsByClassName('outfitCards')[0];
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
    if(doc.scrollLeft === (doc.scrollWidth - doc.clientWidth)) {
      setNeedsScrollRight(false);
    }
    if (doc.scrollLeft === 0) {
      setNeedsScrollLeft(false);
    }
  }

  window.addEventListener("resize", ()=>{

    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      scrollCheck()
    },300);
  });
  return(
    <>
      <h1>yourOutfit</h1>
      {needsScrollLeft ? (
        <div style={{position:'relative', paddingLeft: 10+'px', top: 125+'px'}}>
          <button onClick = {(e)=>{scroll(scollNumber*-1)}} style={{fontSize: 2+'rem', position:'absolute',left:1+'%'}}>&#60;</button>
        </div>
      ): null}
      {needsScrollRight ? (
        <div style={{position:'relative', paddingRight: 10+'px', top: 125+'px'}}>
          <button onClick = {(e)=>{scroll(scollNumber)}} style={{fontSize: 2+'rem', position:'absolute',right:1+'%'}}>&#62;</button>
        </div>
      ): null}
      <div className='outfitCards' onLoad={()=>scrollCheck()} style={{display:'flex', overflowX: 'hidden',}}>
        <div style={{border: 1 + 'px solid black', width: 250+'px', height: 300+'px', margin: 5+'px', backgroundColor:'gray'}}>
          <div style={{fontSize:'10rem', textAlign: 'center'}}>&#43;</div>
        </div>
        {outfitID != [] ? outfitID.map((id, i)=>{return (<RelatedCard key={i} curProduct={curProduct} productID = {id} isRelated={false} />)}) : <div>outfit</div>}
      </div>
    </>
  )
};

export default Outfit;