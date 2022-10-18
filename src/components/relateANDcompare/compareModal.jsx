import React from 'react'
import axios from 'axios'

const CompareModal = (props) => {


  return (
    <div>
      <div>
        <div>Comparing:</div>
        <div>{props.curProductName}</div>
        <div>{props.comProductName}</div>
      </div>
      <div>
        <div>
          {props.allFeatures.map(()=> {
            return (<div>test</div>);
          })}
        </div>
      </div>
    </div>
  );
}

export default CompareModal