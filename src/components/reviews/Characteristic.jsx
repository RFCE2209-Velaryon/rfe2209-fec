import React from 'react';

const beforeLabels = {
  Size: 'A Size too Small',
  Width: 'Too Narrow',
  Comfort: 'Uncomfortable',
  Quality: 'Poor',
  Length: 'Runs Short',
  Fit: 'Runs Tight'
};

const afterLabels = {
  Size: 'A Size too Big',
  Width: 'Too Wide',
  Comfort: 'Perfect',
  Quality: 'Perfect',
  Length: 'Runs Long',
  Fit: 'Runs Long'
};

const Characteristic = ({characteristic, value}) => {
  return (
    <div>
      <div>{characteristic}</div>
      <input type="range" value={value * 100} min="0" max="500" disabled></input>
      <div className='rangeLabelContainer'>
        <div>{beforeLabels[characteristic]}</div>
        <div>{afterLabels[characteristic]}</div>
      </div>
    </div>
  )
}

export default Characteristic;