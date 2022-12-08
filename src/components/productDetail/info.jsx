import React, {useState, useEffect} from "react";



const Info = ({product}) => {

  return (
    <div className='infoWrapper'>
      <div className='infoDetailCategory'>Category: {product.category}</div>
      <div className='infoDetailName'>{product.name}</div>
      <div className='infoDetailPrice'>${product.default_price}</div>
    </div>
  );
}

export default Info;