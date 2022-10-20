import React, { useState, useEffect } from "react";
import axios from "axios";

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Answers = ({qid}) => {
  const [answers, setAnswers] = useState([]);
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
  }, [qid]);

  return(
    <div>
      {answers.map((answer) => {
        var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var date = answer[5].slice(0, 10).split('-');
        date[1] = months[Number(date[1])-1];
        var date = `${date[1]} ${date[2]}, ${date[0]}`;
          return(
            <div key={answer[1]}>
              <div>{answer[2]}</div>
              <div>by {answer[4]}, {date} | Helpful? ({answer[3]})</div>
              <br></br>
            </div>
          )
      })}
    </div>
  )
}

export default Answers;