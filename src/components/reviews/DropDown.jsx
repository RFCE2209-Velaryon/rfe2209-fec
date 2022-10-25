import React from 'react';

const DropDown = ({choices, cb}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(choices);
  const [selectedItem, setSelectedItem] = React.useState(choices[0].value);

  function handleItemClick(id) {
    setSelectedItem(id);
    cb(id);
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-header' onClick={() => setOpen(!isOpen)}>
        <h1>{options.find(option => option.value == selectedItem).label}</h1>
        <i className={`icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {options.map(option => (
          <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={option.value} key={option.value}>
            <span className={`dropdown-item-dot ${option.value == selectedItem && 'selected'}`}>• </span>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropDown;