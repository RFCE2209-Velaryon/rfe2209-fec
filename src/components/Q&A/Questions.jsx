import React, { useState, useEffect } from "react";
import axios from "axios";
import Answers from "./Answers.jsx";
import AnswerModal from "./AnswerModal.jsx";
import './qANDaStyles.css';


const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Questions = ({question, refreshQ, setRefreshQ, prodName}) => {
  const [AModal, setAModal] = useState(false);
  const [Qhelp, setQHelp] = useState(false);
  const [Qreport, setQReport] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [moreAnswers, setMoreAnswers] = useState(true);

  const QhelpHandler = (qid) => {
    return axios.put(`${apiurl}qa/questions/${qid}/helpful`)
      .then((response) => {
        setQHelp(!Qhelp);
        setRefreshQ(!refreshQ);
      })
      .catch((err) => {
        console.log('error in QhelpHandler');
      });
  };

  const QreportHandler = (qid) => {
    return axios.put(`${apiurl}qa/questions/${qid}/report`)
      .then((response) => {
        setQReport(!Qreport);
      })
      .catch((err) => {
        console.log('error in reportHandler');
      })
  };

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  }

  return(
    <div>
      <div key={question[0]}>
        <b>Q: {question[1]}</b>

        {` Helpful? `}
        {Qhelp ? <u>Yes</u> : <u onClick={() => {QhelpHandler(question[0])}}>Yes</u>}
        {` (${question[2]}) | `}
        {Qreport ? <u>Reported</u> : <u onClick={() => {QreportHandler(question[0])}}>Report</u>}
        {` | `}
        {<u onClick={() => setAModal(true)}>Add Answer</u>}
        {AModal && <AnswerModal prodName={prodName} qBody={question[1]} qID={question[0]} setAModal={setAModal} refreshQ={refreshQ} setRefreshQ={setRefreshQ}/>}

        <div className="seeMoreAnswers">{question[3] ? 'A:' : null}
          <Answers qid={question[0]} atotal={question[3]} seeMore={seeMore} setMoreAnswers={setMoreAnswers}/>
        </div>
        {moreAnswers ? (seeMore ? <u onClick={() => toggleSeeMore()}>Collapse answers</u> : <u onClick={() => {toggleSeeMore()}}>See more answers</u>) : null}
      </div>
    </div>
  )
};

export default Questions;