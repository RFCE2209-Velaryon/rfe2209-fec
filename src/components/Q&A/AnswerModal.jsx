import React, { useState, useEffect } from "react";
import axios from "axios";
import './qANDaStyles.css';

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const AnswerModal = ({prodName, qBody, qID, setAModal, refreshQ, setRefreshQ}) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [imagesButton, setImagesButton] = useState(true);

  useEffect(() => {
    if (images.length === 5) {
      setImagesButton(false);
    }
  }, [images]);

  const handleImages = (file) => {
    setImages([...images, file]);
    setImageURLs([...imageURLs, URL.createObjectURL(file)]);
  };

  const handleSubmit = () => {
    var valid = false;
    if (answer !== '' && nickname !== '' && email !== '' && /\S+@\S+\.\S+/.test(email)) {
      valid = true;
    }
    if (valid) {
      axios.post(`${apiurl}qa/questions/${qID}/answers`, {
        body: answer,
        name: nickname,
        email: email,
        photos: [images]
      })
        .then((response) => {
          setRefreshQ(!refreshQ);
          setAModal(false);
          console.log(response);
        })
        .catch((err) => {
          console.log('error in handleSubmit: ', err)
        })
    } else {
      var fields = [answer, nickname];
      var text = ['Answer', 'Nickname'];
      var missing = [];
      fields.forEach((field, index) => {
        if (field === '') {
          missing.push(text[index]);
        }
      });
      if (email === '' || !(/\S+@\S+\.\S+/.test(email))) {
        missing.push('Email');
      }
      return(alert(`You must enter the following: ${missing.map((item) => ` ${item}`)}`))
    }
  };

  return(
    <div className="q-modal">
      <div className="q-modal-content">
        <div className="q-modal-header">
          <h4 className="q-modal-title">Submit Your Answer</h4>
          <h5 className="q-modal-subtitle">{prodName}: {qBody}</h5>
        </div>
        <div className="q-modal-body">
          <div>
            <div>{`Your Answer * `}</div>
            <textarea rows="5" cols="50" maxLength={1000} onChange={(e) => setAnswer(e.target.value)} type='text'></textarea>
          </div>
          <div>
            {`Your Nickname * `}
            <input maxLength={60} onChange={(e) => setNickname(e.target.value)} placeholder='Example: jack543!' type='text'></input>
            <div>For privacy reasons, do not use your full name or email</div>
          </div>
          <div>
            {`Your Email * `}
            <input maxLength={60} onChange={(e) => setEmail(e.target.value)} placeholder='Example: jack@email.com' type='text'></input>
            <div>For authentication reasons, you will not be emailed</div>
          </div>
          <div>
            {`Upload Your Photos (optional) `}
            {imagesButton && <input type="file" accept="image/png, image/jpeg"
              onChange={(e) => {
                handleImages(e.target.files[0]);
              }}
            />}
            {images.length !== 0 && images.map((file) =>
              {return(
                  <div key={file.name}>
                    <img alt={file.name} width="250px" src={URL.createObjectURL(file)} />
                  </div>
                )
              }
            )}
          </div>
        </div>
        <div className="q-modal-footer">
          <button onClick={() => {setAModal(false)}}>Close</button>
          <button onClick={() => {handleSubmit()}}>Submit</button>
        </div>
      </div>
    </div>
  )
};

export default AnswerModal;