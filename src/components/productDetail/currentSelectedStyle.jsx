import React from "react";
import {useState, useEffect} from "react"





const CurrentSelectedStyle = ({items, image, setImage, didClick, setDidClick, prod}) => {
  const [sale, setSale] = useState("")



const onSale = () => {
  if(items.sale_price === null){
    setSale(items.original_price)
  } else if (items.sale_price !== null){
    setSale(items.sale_price)
  }
}


 const display = ()=> {
  if(image.split('').length === 0){
    setImage(items.photos[0].url)
  };
 };

 useEffect(()=>{
  onSale(),
  display()
 });

  return(
    <div className="c-thumbnail" >
        <div style={ {color: items.sale_price === null ? "white" :'red'}}>{sale}</div>
         {items.photos.map((item, i)=>{
          return  <img key={i} className="circle-thumbnail" src={item.url}   onClick={()=>(
            setImage(item.url), setDidClick(true)
          )}/>
    })}


    </div>

  )
};

export default CurrentSelectedStyle;