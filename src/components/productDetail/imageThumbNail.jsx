import React from "react";
import {useState, useEffect} from "react"



const ImageThumbnail= ({items, image, setImage, didClick, setDidClick}) => {
const [highlight, setHiglight] = useState("")
const [hasFocus, setFocus] = useState(false);
const [style, setStyle] = useState({})

 const highlighted = ()=>{
    setStyle( {border: highlight})
 }




const isHighlight = () => {
  setHiglight("5px solid #555")
}

 const displayThumb = ()=> {
  if(image.split('').length === 0){
    setImage(items.photos[0].url)
  }


 }


 useEffect(()=>{
  displayThumb()
 })


  const styles = {
      height: 100,
      width: 100,
      borderWidth: 5,
      borderColor:'white',
      border: highlight
  };


  return(
    <div className="thumbnail">
         {items.photos.map((item)=>{
          return  <ul key={item.url} >
              <img  src={item.url}  style={{border: image === item.url ? "4px solid green" : ""}}  onClick={()=>(
            setImage(item.url), setDidClick(true)
          )}/>

          </ul>
    })}
    </div>

  )
};

export default ImageThumbnail;