import React, { useState } from "react";
import axios from "axios";

const QuestionList = ({questions, getReq}) => {
  var questions = (questions === []) ? console.log('no questions') : questions.sort((questionA, questionB) => {
    return questionB[1] - questionA[1];
  });
  console.log(questions.length);
  var mapped = (questions === []) ? console.log('no questions') : questions.map((question, index) => {
    const markHelpful = () => {
      return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question[2]}/helpful`)
      .then(() => {getReq()})
      .catch((err) => {console.log("error updating helpfulness")});
    };
    return(
      <div key={index}>
        <span>
          <b>{question[0]}</b> Helpful? <u onClick={() => {markHelpful()}}>Yes</u> ({question[1]})
          {/* event listener, options, once true */}
        </span>
      </div>
    )
  });
  const [show, setShow] = useState(false);
  var mappedLength = (questions === []) ? 0 : mapped.Length;
  console.log(mapped.Length);
  if (mappedLength > 4) {
    setShow(true);
  }
  //mapped when greater than length 4
  // ==> when not displayed length is greater than 2
  // =====> button stays when clicked
  // --> when not displayed length is less than 2
  // =====> button disappears
  const handleClick = () => {

  }
  return(
    <div>
      {Array.isArray(mapped) ? mapped.slice(0,mappedLength) : mapped}
      {show ? <button onClick={() => handleClick()}>More Answered Questions</button> : <></>}
    </div>
  )
}

export default QuestionList;