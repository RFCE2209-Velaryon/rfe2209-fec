import React from "react";

const {useState, useEffect} = React;
const Info = (props) => {
  return (
    <div className='infoWrapper'>
      <div className='infoDetailCategory'>Category: {props.product.category}</div>
      <div className='infoDetailName'>{props.product.name}</div>
      <div className='infoDetailPrice'>${props.product.default_price}</div>
    </div>
  );
}

export default Info;