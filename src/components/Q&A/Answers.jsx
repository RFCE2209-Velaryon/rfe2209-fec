import React, { useState, useEffect } from "react";
import axios from "axios";

import Answer from "./Answer.jsx"
import "./qANDaStyles.css";

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Answers = ({qid, atotal, seeMore, setMoreAnswers}) => {
  const [answers, setAnswers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getAs = (qID, pageCount, aCount) => {
    return axios.get('/qa/questions/answers', {
      params: {
        qid: qID,
        page: pageCount,
        count: aCount
      }
    })
  };

  useEffect(() => {
    var storage = [];
    if (atotal <= 2) {
      setMoreAnswers(false);
    }
    getAs(qid, 1, atotal)
    .then((response) => {
      response.data.forEach((item) => {
        if (item.photos !== []) {
          var images = [];
          if (item.photos) {
            item.photos.forEach((photo) => {
              images.push(photo.url);
            })
          }
          if (item.answerer_name === 'Seller') {
            storage.unshift([qid, item.answer_id, item.body, item.helpfulness, item.answerer_name, item.date, images]);
          } else {
            storage.push([qid, item.answer_id, item.body, item.helpfulness, item.answerer_name, item.date, images]);
          }
        } else {
          if (item.answerer_name === 'Seller') {
            storage.unshift([qid, item.answer_id, item.body, item.helpfulness, item.answerer_name, item.date]);
          } else {
            storage.push([qid, item.answer_id, item.body, item.helpfulness, item.answerer_name, item.date]);
          }
        }
      })
    })
    .then((response) => {
      seeMore ? setAnswers(storage) : setAnswers(storage.slice(0,2))
    })
    .catch((err) => console.log(err));
  }, [qid, refresh, seeMore]);

  return(
    <div>
      {answers.map((answer) =>
        <Answer key={answer[1]} answer={answer} refresh={refresh} setRefresh={setRefresh}/>
      )}
    </div>
  )
}

export default Answers;