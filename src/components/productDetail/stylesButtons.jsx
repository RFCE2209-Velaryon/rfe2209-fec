import React from "react";
import {useState, useEffect} from "react"




const ItemSelectors = () => {
  return(
    <div>
      <select name="selectedList" id="seletedList">
      <option value='"option 0'>Select Size</option>
      <option value='"option 1'>S</option>
       </select>

       <select name="selectedQty" id="seletedQty">
      <option value='"option 0'>--Qty-</option>
      <option value='"option 1'>1</option>
       </select>


       <select name="cart" id="cart">
      <option value='"option 0'>--Add to cart--</option>
      <option value='"option 1'>1</option>
       </select>
    </div>

  )
};

export default ItemSelectors;