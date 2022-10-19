import React from 'react';

const ImgModal = ({photo}) => {
  const [open, setOpen] = React.useState(false);

  function onToggle() {
    setOpen(!open);
  }

  return (
    <div>
      <img onClick={onToggle} className='modalImageThumbnail' src={photo.url} />
      {open && <div onClick={onToggle} className='grayModalBackground'>
                <img className='modalImage' src={photo.url} />
                <div className='closeModalImage'>X</div>
               </div>
               }
    </div>
  )
}

export default ImgModal;