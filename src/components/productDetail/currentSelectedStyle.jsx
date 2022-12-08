import React from "react";
import {useState, useEffect} from "react"








const CurrentSelectedStyle = ({items, image, setImage, didClick, setDidClick, product}) => {
  const [sale, setSale] = useState("")
  console.log(items.photos[0].url)



const onSale = () => {
  if(items.sale_price === null){
    setSale(items.original_price)
  } else if (items.sale_price !== null){
    setSale(items.sale_price)
  }
}


//  const display = ()=> {
//   if(image.split('').length === 0){
//     setImage(items.photos[0].url)
//   };
//  };

 useEffect(()=>{
  onSale()
  // display()
 },[]);

  return(
    <div id="c-thumbnail" >
        {/* <div style={ {color: items.sale_price === null ? "white" :'red'}}>{`$ ${sale}`}</div> */}
         {items.photos.map((item, i)=>{
          return  <img key={i} className="circle-thumbnail" src={item.url} style={{border: image === item.url ? "4px solid green" : ""}} onClick={()=>(
            setImage(item.url), setDidClick(true)
          )}/>
    })}
    </div>

  )
};

export default CurrentSelectedStyle;