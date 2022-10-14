import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Related = () => {
  let [items, setItems] = useState([{name: 'loading...'}]);
  let [related, setRelated] = useState([]);

  useEffect(()=>{
    getProduct().then(res => {
      setItems(res.data);
    });
  },[]);

  let getRelated = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/related'
    });
  }
  return(
    <>
      <h1>Related Items Component</h1>
      <div>{items[0].name}</div>
    </>
  )
};

export default Related;