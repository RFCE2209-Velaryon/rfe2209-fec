import React from "react";
import {useState, useEffect} from "react";




const ItemSelectors = ({items, product}) => {
  const [size, setSize] = useState([])
  const [quantity, setQuantity] = useState([])
  const [availableSize, setAvailableSize] = useState('')





  const getQuanity = () => {
    let sizes =  [];
    // let qty = [];
    for( var key in items.skus){
      sizes.push(items.skus[key].size)
      // qty.push(items.skus[key].quantity)
    }
    // setQuantity(qty.sort((a,b)=> a-b))
    setSize(sizes)
  }

  const getSize = () => {
    const qty = []
    let countSizes = 0;
    for( var key in items.skus){
      console.log(items.skus[key].size, availableSize)
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

  //should only show drop down of up to how many size or qty's are available

  return(
    <div>
      <select  className="select" onChange={(e) => {setAvailableSize(e.target.value)}} >
      <option >Select Size</option>
      {size.map((sizes,i)=>{
       return <option key={i}>{sizes}</option>
      })}
       </select>

       <select className="select"  onClick={() => {getSize()}}>
      <option >--Qty-</option>
      {quantity.map((qtys)=>{
       return <option key={qtys}>{qtys}</option>
      })}
       </select>


       <select className="select">
      <option>--Add to cart--</option>
      <option>1</option>
       </select>
    </div>

  )
};

export default ItemSelectors;