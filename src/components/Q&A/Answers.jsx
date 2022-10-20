import React, { useState, useEffect } from "react";
import axios from "axios";

import Answer from "./Answer.jsx"

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Answers = ({qid}) => {
  const [answers, setAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getAs = (qID, pageCount, aCount) => {
    return axios.get(`${apiurl}qa/questions/${qID}/answers`, {
      params: {
        page: pageCount,
        count: aCount
      }
    })
  };

  useEffect(() => {
    var storage = [];
    getAs(qid, 1, 2)
      .then((response) => {
        // console.log(qid, response.data.results);
        response.data.results.forEach((item) => {
          if (item.photos !== []) {
            var images = [];
            item.photos.forEach((photo) => {
              images.push(photo.url);
            })
            storage.push([qid, item.answer_id, item.body, item.helpfulness, item.answerer_name, item.date, images]);
          } else {
            storage.push([qid, item.answer_id, item.body, item.helpfulness, item.answerer_name, item.date]);
          }
        })
      })
      .then((response) => {
        setAnswers(storage);
      })
      .catch((err) => console.log(err));
  }, [qid, refresh]);

  return(
    <div>
      {answers.map((answer) =>
        <Answer key={answer[1]} answer={answer} refresh={refresh} setRefresh={setRefresh}/>
      )}
    </div>
  )
}

export default Answers;