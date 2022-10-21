import React, { useState, useEffect } from "react";
import axios from "axios";

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Answer = ({answer, refresh, setRefresh}) => {
  var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var date = answer[5].slice(0, 10).split('-');
  date[1] = months[Number(date[1])-1];
  var date = `${date[1]} ${date[2]}, ${date[0]}`;

  const [help, setHelp] = useState(false);
  const [report, setReport] = useState(false);

  const helpHandler = (aid) => {
    return axios.put(`${apiurl}qa/answers/${aid}/helpful`)
      .then((response) => {
        setHelp(!help);
      })
      .then((response) => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log('error in helpHandler');
      });
  };

  const reportHandler = (aid) => {
    return axios.put(`${apiurl}qa/answers/${aid}/report`)
      .then((response) => {
        setReport(!report);
      })
      .catch((err) => {
        console.log('error in reportHandler');
      })
  };

  return(
    <div key={answer[1]}>
      <div>{answer[2]}</div>
      <div>
        {`by `}
        {answer[4] === 'Seller' ? <b>{answer[4]}</b>: answer[4]}
        {`, ${date} | Helpful? `}
        {help ? <u>Yes</u> : <u onClick={() => {helpHandler(answer[1])}}>Yes</u>}
        {` (${answer[3]}) | `}
        {report ? <u>Reported</u> : <u onClick={() => {reportHandler(answer[1])}}>Report</u>}
      </div>
      <div>
        {answer[6] ? answer[6].map((image, index) => {return (<img key={index} src={image} width="125" height="100"/>)}) : null}
      </div>
      <br></br>
    </div>
  )
};

export default Answer;
