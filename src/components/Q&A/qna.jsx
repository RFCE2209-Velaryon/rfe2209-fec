import React, { useState, useEffect } from "react";
import axios from "axios";
import Questions from "./Questions.jsx";

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const QuestionsAndAnswers = ({prodID}) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (prodID) {
      getQs(prodID, 1, 4)
        .then((response) => {
          console.log('original: ', response.data.results);
          var questionList = [];
          response.data.results.forEach((item) => {
            questionList.push([item.question_id, item.question_body, item.question_helpfulness]);
          });
          setQuestions([...questions, ...questionList]);
        })
        .catch((error) => console.log('error at getQs:', error));
    }
  }, [prodID]);
  const getQs = (prodID, pageCount, qCount) => {
    return axios.get(`${apiurl}qa/questions`, {
      params: {
        product_id: prodID,
        page: pageCount,
        count: qCount
      }

    })
  }
  return(
    <div>
      <h1>Q&A Component</h1>
      {/* searchbar */}
      {questions.length > 0 && <Questions questions={questions}/>}
      {/* add more questions */}
    </div>
  )
};

export default QuestionsAndAnswers;