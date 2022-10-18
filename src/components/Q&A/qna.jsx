import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar.jsx";
import QuestionList from "./QuestionList.jsx";
import AddQuestion from "./AddQuestion.jsx";

const QuestionsAndAnswers = ({prodID}) => {
  const [questions, setQuestions] = useState([]);
  var questionsArray = [];
  var pageCount = 0;
  const getReq = (pageCount) => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', {
        params: {
          product_id: prodID,
          page: pageCount,
          count: 2
        }
      })
        .then((response) => {
          if (response.data.results && response.data.results.length > 0) {
            for (var object of response.data.results) {
              questionsArray.push([object.question_body, object.question_helpfulness, object.question_id]);
            }
          }
          setQuestions([...questions, ...questionsArray]);
        })
        .catch((err) => {console.log(err)});
  };
  useEffect(() => {
    if (prodID) {
      pageCount++;
      getReq(pageCount);
      pageCount++;
      getReq(pageCount);
    }
  }, [prodID]);
  return(
    <div>
      <h1>Q&A Component</h1>
      <SearchBar />
      <QuestionList questions={questions} getReq={getReq}/>
      <AddQuestion />
    </div>
  )
};

export default QuestionsAndAnswers;