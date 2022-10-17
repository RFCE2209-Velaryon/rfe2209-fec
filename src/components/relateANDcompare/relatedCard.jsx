import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const RelatedCard = (props) => {
  let [displayItems, setDisplayItems] = useState([<div>loading...</div>]);

  useEffect(()=>{
    let itemHolder = [];
    itemHolder.push(getProductData(props.productID).then((proData)=> {
      return getProductStyle(props.productID).then((styleData) => {
        return getProductStars(props.productID).then((starData) => {
          let stars = setStars(starData.data.ratings);
          let imgSrc = () => {
            if (styleData.data.results[0].photos[0].thumbnail_url) {
              return styleData.data.results[0].photos[0].thumbnail_url;
            } else {
              return 'https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'
            }
          }
          return (
            <div style={{border: 1 + 'px solid black', width: 'fit-content' }}>
              <img style={{height: 200+'px', width: 'auto'}} src={imgSrc()}></img>
              <div>{proData.data.name}</div>
              <div>{proData.data.category}</div>
              <div>${proData.data.default_price}</div>
              <div>stars: {stars}</div>
            </div>
          );
        })
      })
    }));
    Promise.all(itemHolder).then(items=> {
      setDisplayItems(items);
    })
  },[]);

  useEffect(()=> {
    //console.log(displayItems.length);
  })

  let getProductData = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id
    })
  }

  let getProductStyle = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/styles'
    })
  }

  let getProductStars = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'reviews/meta',
      params: {product_id: id}
    })
  }
  let setStars = (starData) => {
    let keys = Object.keys(starData);
    let count = 0;
    let total = 0;
    keys.forEach(key => {
      count += Number(starData[key])
      total += (Number(starData[key]) * key);
    });
    return (Math.round((total / count)*4)/4);
  }

  return(
    <>
      <div>
        {displayItems.map((item)=>{return (<div>{item}</div>)})}
      </div>
    </>
  )
};

export default RelatedCard;