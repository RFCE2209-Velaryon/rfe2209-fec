import React from "react";
import {useState, useEffect} from "react"




const ItemSelectors = ({items, prod}) => {
  const [size, setSize] = useState([])
  const [quantity, setQuantity] = useState([])



  const getSize = () => {
    let sizes =  [];
    let qty = [];
    for( var key in items.skus){
      sizes.push(items.skus[key].size)
      qty.push(items.skus[key].quantity)
    }
    setQuantity(qty.sort((a,b)=> a-b))
    setSize(sizes)
  }

  useEffect(()=>{
    getSize()
  },[])

  return(
    <div>
      <select  id="seletedList">
      <option >Select Size</option>
      {size.map((sizes,i)=>{
       return <option key={i}>{sizes}</option>
      })}
       </select>

       <select name="selectedQty" id="seletedQty">
      <option>--Qty-</option>
      {quantity.map((qtys)=>{
       return <option key={qtys}>{qtys}</option>
      })}
       </select>


       <select name="cart" id="cart">
      <option>--Add to cart--</option>
      <option>1</option>
       </select>
    </div>

  )
};

export default ItemSelectors;