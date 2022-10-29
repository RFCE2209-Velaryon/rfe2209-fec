import React, { useState, useEffect } from "react";
import axios from "axios";
import Answers from "./Answers.jsx";
import AnswerModal from "./AnswerModal.jsx";
import './qANDaStyles.css';


const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Questions = ({question, refreshQ, setRefreshQ, prodName}) => {
  if (question) {
    const [AModal, setAModal] = useState(false);
    const [atotal, setAtotal] = useState(question[3]);
    const [Qhelp, setQHelp] = useState(false);
    const [Qreport, setQReport] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [moreAnswers, setMoreAnswers] = useState(true);

    useEffect(() => {}, [atotal])

    const QhelpHandler = (qid) => {
      return axios.put('/qa/questions/helpful', null, {
        params: {
          qid: qid
        }
      })
        .then((response) => {
          setQHelp(!Qhelp);
          setRefreshQ(!refreshQ);
        })
        .catch((err) => {
          console.log('error in QhelpHandler');
        });
    };

    const QreportHandler = (qid) => {
      return axios.put('/qa/questions/report', null, {
        params: {
          qid: qid
        }
      })
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
        <div className="flexDisplay">
          <div className="flexQ" key={question[0]}>
            <b>Q: {question[1]}</b>
          </div>
          <div className="flexO">
            {` Helpful? `}
            {Qhelp ? <u>Yes</u> : <u onClick={() => {QhelpHandler(question[0])}} className='clickable'>Yes</u>}
            {` (${question[2]}) | `}
            {Qreport ? <u>Reported</u> : <u onClick={() => {QreportHandler(question[0])}} className='clickable'>Report</u>}
            {` | `}
            {<u onClick={() => setAModal(true)} className='clickable'>Add Answer</u>}
          </div>
        </div>
        {AModal && <AnswerModal prodName={prodName} qBody={question[1]} qID={question[0]} setAModal={setAModal} atotal={atotal} setAtotal={setAtotal}/>}
        <div className="flexDisplay">
          <div className="flexA">{atotal ? 'A:' : null}</div>
          <div className="seeMoreAnswers">
            {question[0] && <Answers qid={question[0]} atotal={atotal} seeMore={seeMore} setMoreAnswers={setMoreAnswers}/>}
            {moreAnswers ? (seeMore ? <u onClick={() => toggleSeeMore()} className='clickable'>Collapse answers</u> : <u onClick={() => {toggleSeeMore()}} className='clickable'>See more answers</u>) : null}
          </div>
        </div>
      </div>
    )
  }
};

export default Questions;