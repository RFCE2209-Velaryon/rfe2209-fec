import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Related = () => {
  let [items, setItems] = useState([{name: 'loading...'}]);
  let [related, setRelated] = useState([]);
  let [displayItems, setDisplayItems] = useState([<div>loading...</div>]);

  useEffect(()=>{
    getProduct().then(res => {
      setItems(res.data);
      let itemHolder = [];
      getRelated(res.data[0].id).then((relRes) => {
        setRelated(relRes.data);
        relRes.data.forEach(rel => {
          itemHolder.push(getProductData(rel).then((proData)=> {
            return (<><div>{proData.data.name}</div><div>{proData.data.category}</div><div>{proData.data.default_price}</div></>);
          }));
        })
        Promise.all(itemHolder).then(items=> {
          setDisplayItems(items);
          console.log(items);
        })
      }).then(()=>{

      });
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

  let getRelated = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/related'
    });
  }
  return(
    <>
      <h1>Related Items Component</h1>
      <div>{displayItems.map((item)=>{
        return (<div>{item}</div>);
      })}</div>
    </>
  )
};

export default Related;