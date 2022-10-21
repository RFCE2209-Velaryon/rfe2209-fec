import React, { useState, useEffect } from "react";
import axios from "axios";
import Questions from "./Questions.jsx";
import SearchBar from "./SearchBar.jsx";

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const QuestionsAndAnswers = ({prodID}) => {
  const [totalQs, setTotalQs] = useState(4);
  const [showButton, setShowButton] = useState(false);
  const [questions, setQuestions] = useState([]);
  // const [filtered, setFiltered] = useState(); //might need to change later
  const [refreshQ, setRefreshQ] = useState(false);
  const getQs = (prodID, pageCount, qCount) => {
    return axios.get(`${apiurl}qa/questions`, {
      params: {
        product_id: prodID,
        page: pageCount,
        count: qCount
      }
    })
  };

  useEffect(() => {
    if (prodID) {
      var storage = [];
      getQs(prodID, 1, totalQs < 4 ? 4 : totalQs)
        .then((response) => {
          response.data.results.forEach((item) => {
            var count = 0;
            for (var a in item.answers) {
              count++;
            }
            storage.push([item.question_id, item.question_body, item.question_helpfulness, count]);
          });
        })
        .then((response) => {
          setTotalQs(storage.length);
          setQuestions(storage);
        })
        .then((response) => {
          getQs(prodID, 1, totalQs+1)
          .then((response) => {
              if (response.data.results.length > totalQs) {
                setShowButton(true);
              } else {
                setShowButton(false);
              }
            })
        })
        .catch((error) => console.log('error at getQs:', error));
    }
  }, [prodID, refreshQ]);


  const moreQuestions = () => {
    getQs(prodID, 1, totalQs+2)
      .then((response) => {
        var newQs = response.data.results.slice(totalQs);
        newQs = newQs.map((q) => {
          var count = 0;
          for (var a in q.answers) {
            count++;
          }
          return ([q.question_id, q.question_body, q.question_helpfulness, count])
        });
        setQuestions([...questions, ...newQs]);
        setRefreshQ(!refreshQ);
        setTotalQs(totalQs+2);
      });
  };

  return(
    <div>
      <h1>Q&A Component</h1>
      {/* <SearchBar questions={questions} setFiltered={setFiltered}/> */}
      <div>
        {questions.length > 0 ? questions.map((question, index)=>
          <div key={index}>
            <Questions key={question[0]} question={question} refreshQ={refreshQ} setRefreshQ={setRefreshQ} totalQs={totalQs}/>
            <br></br>
          </div>
        ) : null}
        {showButton ? <button onClick={()=> {moreQuestions()}}>More Answered Questions</button> : null}
      </div>
      {/* add more questions */}
    </div>
  )
};

//onClick of button > append 2 more questions to our list


export default QuestionsAndAnswers;