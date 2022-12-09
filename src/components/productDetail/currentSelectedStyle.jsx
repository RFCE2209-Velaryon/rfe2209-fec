import React from "react";
import {useState, useEffect} from "react"


const CurrentSelectedStyle = ({items, image, setImage, didClick, setDidClick, product,didHover, setDidHover}) => {

  return(
  <div>
    <h1>STYLE</h1> <h3> > Selected Style</h3>
    <div id="c-thumbnail" >
         {items.photos.map((item, i)=>{
          return  <img key={i} className="circle-thumbnail" src={item.url} style={{border: image === item.url ? "4px solid green" : ""}} onClick={()=>(
            setImage(item.url), setDidClick(true)
          )} onMouseEnter={()=>(
            setImage(item.url), setDidHover(true)
          )} onMouseLeave={()=>(
            setImage(item.url), setDidHover(false)
          )}/>
    })}
    </div>
</div>
  )
};

export default CurrentSelectedStyle;