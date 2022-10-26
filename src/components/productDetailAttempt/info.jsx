import React from "react";

const {useState, useEffect} = React;
const Info = (props) => {
  return (
    <div className='infoWrapper'>
      <div className='infoDetail'>{props.product.name}</div>
      <div className='infoDetail'>{props.product.category}</div>
      <div className='infoDetail'>${props.product.default_price}</div>
    </div>
  );
}

export default Info;