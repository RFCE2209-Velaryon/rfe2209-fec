import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Related = (props) => {
  let [items, setItems] = useState([{name: 'loading...'}]);
  let [related, setRelated] = useState([]);
  let [displayItems, setDisplayItems] = useState([<div>loading...</div>]);

  useEffect(()=>{
    getProduct().then(res => {
      setItems(res.data);
      let itemHolder = [];
      getRelated(res.data[0].id).then((relRes) => {
        console.log('relatedIDs: ', relRes.data);
        setRelated(relRes.data);
        relRes.data.forEach(rel => {
          itemHolder.push(getProductData(rel).then((proData)=> {
            return getProductStyle(rel).then((styleData) => {
              return getProductStars(rel).then((starData) => {
                let stars = setStars(starData.data.ratings);
                return (
                  <div style={{border: 1 + 'px solid black', width: 'fit-content' }}>
                    <img style={{height: 200+'px', width: 'auto'}} src={styleData.data.results[0].photos[0].thumbnail_url}></img>
                    <div>{proData.data.name}</div>
                    <div>{proData.data.category}</div>
                    <div>{proData.data.default_price}</div>
                    <div>stars: {stars}</div>
                  </div>);
              })

            })
          }));
        })
        Promise.all(itemHolder).then(items=> {
          setDisplayItems(items);
        })
      })
    });
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

  let getRelated = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/related'
    });
  }
  return(
    <>
      <h1>Related Items Component</h1>
      <div style={{display:'flex'}}>{displayItems.map((item)=>{
        return (<div>{item}</div>);
      })}</div>
    </>
  )
};

export default Related;