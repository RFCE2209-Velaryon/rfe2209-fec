import React from "react";
import './productStyle.css';

const Style = (props) => {

  return (
    <>
    <div className='styleWrapper'>
      <div className='styleTitle'>Style > {props.currentStyles.styles[props.currentStyle].name}</div>
      <div className='styleThumbnailWrapper'>
        {props.currentStyles.styles.length ? props.currentStyles.styles.map((style,i)=>{
          return (<img key={i} onClick={(e)=>{props.setCurrentPhotos({photos: style.photos}); props.setCurrentImage(0); props.setCurrentStyle(i)}} className='styleThumbnail' style={{border: props.currentStyle === i ? 'solid .25em #2088ff':''}} src={style.photos[0].thumbnail_url}></img>)
        }) : null}
      </div>

    </div>
    </>
  );
}



export default Style;