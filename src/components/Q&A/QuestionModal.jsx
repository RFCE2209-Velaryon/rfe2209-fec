import React, { useState } from "react";
import axios from "axios";
import './qANDaStyles.css';

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const QuestionModal = ({prodID, prodName, setQModal, refreshQ, setRefreshQ}) => {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = () => {
    var valid = false;
    if (question !== '' && nickname !== '' && email !== '' && /\S+@\S+\.\S+/.test(email)) {
      valid = true;
    }
    if (valid) {
      return axios.post('/qa/questions', {
        "body": question,
        "name": nickname,
        "email": email,
        "product_id": prodID
      })
        .then((response) => {
          setRefreshQ(!refreshQ);
          setQModal(false);
        })
        .catch((err) => {
          console.log('error in handleSubmit')
        })
    } else {
      var fields = [question, nickname];
      var text = ['Question', 'Nickname'];
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
          <h4 className="q-modal-title">Ask Your Question</h4>
          <h5 className="q-modal-subtitle">About the {prodName}</h5>
        </div>
        <div className="q-modal-body">
          <div>
            <div>{`Your Question * `}</div>
            <textarea rows="5" cols="50" maxLength={1000} onChange={(e) => setQuestion(e.target.value)} placeholder='Why did you like the product or not?' type='text'></textarea>
          </div>
          <div>
            {`Your Nickname * `}
            <input maxLength={60} onChange={(e) => setNickname(e.target.value)} placeholder='Example: jackson11!' type='text'></input>
            <div>For privacy reasons, do not use your full name or email</div>
          </div>
          <div>
            {`Your Email * `}
            <input maxLength={60} onChange={(e) => setEmail(e.target.value)} placeholder='Example: jackson11@gmail.com' type='text'></input>
            <div>For authentication reasons, you will not be emailed</div>
          </div>
        </div>
        <div className="q-modal-footer">
          <button onClick={() => {setQModal(false)}}>Close</button>
          <button onClick={() => {handleSubmit()}}>Submit</button>
        </div>
      </div>
    </div>
  )
};

export default QuestionModal;