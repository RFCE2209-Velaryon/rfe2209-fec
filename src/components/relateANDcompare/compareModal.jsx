import React from 'react'
import axios from 'axios'
import './relateStyle.css';

const CompareModal = (props) => {


  return (
    <div onClick={()=>props.onClick()} className='modalWrapper'>
      <div className='modalContent'>
        <div className='relative'>
          <button className='modalBtn' onClick={(e) => {console.log('testingModal')}}>&#9733;</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>{null}</th>
              <th>Comparing</th>
              <th>{null}</th>
            </tr>
            <tr>
              <th>{props.curProduct.name}</th>
              <th>{null}</th>
              <th>{props.comProduct.name}</th>
            </tr>
          </thead>
          <tbody>
            {props.allFeatures.map((feat, i)=> {
              return (<tr key = {i}><td>{feat[0]}</td><td>{feat[1]}</td><td>{feat[2]}</td></tr>);
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareModal