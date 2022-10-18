import React from 'react'
import axios from 'axios'

const CompareModal = (props) => {


  return (
    <div>
      <div>
        <div>Comparing:</div>
        <div>{props.curProduct.name}</div>
        <div>{props.comProduct.name}</div>
      </div>
      <div>
        <div>
          {props.allFeatures.map((feat, i)=> {
            return (<div style={{display:'grid'}} key = {i}>{feat}</div>);
          })}
        </div>
      </div>
    </div>
  );
}

export default CompareModal