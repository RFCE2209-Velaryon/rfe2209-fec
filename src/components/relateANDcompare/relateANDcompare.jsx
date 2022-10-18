import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import RelatedCard from './relatedCard.jsx'

const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Related = (props) => {
  let [related, setRelated] = useState([]);
  let [curProduct, setCurProduct] = useState({name:'',features:[]});


  useEffect(()=>{
    if(props.productID) {
      relatedHandler(props.productID);
    } else {
      getProduct().then(res => {
        relatedHandler(res.data[0].id)
      });
    }
  },[]);

  let relatedHandler = (id) => {
    getRelated(id).then((relRes) => {
      console.log('relatedIDs: ', relRes.data);
      setRelated(relRes.data);
    })
  };

  let getRelated = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/related'
    });
  }
  return(
    <>
      <h1>Related Items Component</h1>
      <div style={{display:'flex'}}>
        {related != [] ? related.map((id, i)=>{return (<RelatedCard key={i} curProduct={curProduct} productID = {id} />)}) : null}
      </div>
    </>
  )
};

export default Related;