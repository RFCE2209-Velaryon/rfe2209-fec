import React from 'react'
import axios from 'axios'

const CompareModal = (props) => {


  return (
    <div onClick={()=>props.onClick()} style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', position:'fixed', zIndex: 10, left: 0, top: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}} className='modalWrapper'>
      <div style={{backgroundColor: 'white', position:'relative', width: 400+'px', border: 1 + 'px solid black'}} className='modalContent'>
        <div className='modalHeader'>
          <div>Comparing:</div>
          <div>{props.curProduct.name}</div>
          <div>{props.comProduct.name}</div>
        </div>
        <div className='modalBody'>
          <div>
            {props.allFeatures.map((feat, i)=> {
              return (<div style={{display:'grid'}} key = {i}>{feat}</div>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareModal