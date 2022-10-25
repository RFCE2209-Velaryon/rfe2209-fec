import React from 'react'
import axios from 'axios'
import './relateStyle.css';

const CompareModal = (props) => {


  return (
    <div onClick={()=>props.onClick()} style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', position:'fixed', zIndex: 10, left: 0, top: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}} className='modalWrapper'>
      <div style={{backgroundColor: 'white', position:'relative', width: 405+'px', height: '200px', border: 1 + 'px solid black', overflowY:'scroll'}} className='modalContent'>
        <div className='relative'>
          <button className='modalBtn' onClick={(e) => {console.log('testingModal')}}>&#9733;</button>
        </div>
        <table>
          <tr style ={{alignItems: 'center', justifyContent: 'center'}}>
            <th style={{textAlign: 'center', width:135+'px'}}>{null}</th>
            <th style={{textAlign: 'center', width:135+'px'}}>Comparing</th>
            <th style={{textAlign: 'center', width:135+'px'}}>{null}</th>
          </tr>
          <tr>
            <th>{props.curProduct.name}</th>
            <th>{null}</th>
            <th>{props.comProduct.name}</th>
          </tr>
          {props.allFeatures.map((feat, i)=> {
            return (<tr key = {i}><td style={{textAlign: 'center', width:135+'px', height: '40px'}}>{feat[0]}</td><td style={{textAlign: 'center', width:135+'px'}}>{feat[1]}</td><td style={{textAlign: 'center', width:135+'px'}}>{feat[2]}</td></tr>);
          })}
        </table>
      </div>
    </div>
  );
}

export default CompareModal