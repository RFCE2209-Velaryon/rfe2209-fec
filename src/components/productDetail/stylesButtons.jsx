import React from "react";
import {useState, useEffect} from "react";

const ItemSelectors = ({items, product}) => {
  const [size, setSize] = useState([])
  const [quantity, setQuantity] = useState([])
  const [availableSize, setAvailableSize] = useState('')

  const getQuanity = () => {
    let sizes =  [];
    for( var key in items.skus){
      sizes.push(items.skus[key].size)
    }

    setSize(sizes)
  }

  const getSize = () => {
    const qty = []
    let countSizes = 0;
    for( var key in items.skus){
      if( items.skus[key].size === availableSize ) {
      while (countSizes < items.skus[key].quantity){
           countSizes = countSizes + 1
          qty.push(countSizes)
          setQuantity(qty)
        }
      }
  }
  }
  useEffect(()=>{
    getQuanity()
  },[])

  return(
    <div className="styleButton">
      <select  className="select" onChange={(e) => {setAvailableSize(e.target.value)}} >
      <option >Select Size</option>
      {size.map((sizes,i)=>{
       return <option key={i}>{sizes}</option>
      })}
       </select>

       <select className="selectTwo"  onClick={() => {getSize()}}>
      <option >--Qty-</option>
      {quantity.map((qtys)=>{
       return <option key={qtys}>{qtys}</option>
      })}
       </select>


       <select className="selectThree">
      <option>--Add to cart--</option>
      <option>1</option>
       </select>

       <button className="selectButton">⭐️</button>
    </div>

  )
};

export default ItemSelectors;