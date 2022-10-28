import React, { useState, useEffect } from "react";
import axios from "axios";
import Questions from "./Questions.jsx";
import SearchBar from "./SearchBar.jsx";
import QuestionModal from "./QuestionModal.jsx";
import './qANDaStyles.css';


const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const QuestionsAndAnswers = ({prodID, prodName}) => {
  const [QModal, setQModal] = useState(false);
  const [totalQs, setTotalQs] = useState(4);
  const [showButton, setShowButton] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState(questions);
  const [refreshQ, setRefreshQ] = useState(false);

  const getQs = (prodID, pageCount, qCount) => {
    return axios.get('/qa/questions', {
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
      var test;
      getQs(prodID, 1, 4*30)
        .then((response) => {
          if (response.data !== []) {
            response.data.forEach((item) => {
              if (storage.length !== 4) {
                var count = 0;
                for (var a in item.answers) {
                  count++;
                }
                storage.push([item.question_id, item.question_body, item.question_helpfulness, count]);
                setShowButton(false);
              }
              else if (test === undefined) {
                test = item.question_id;
                if (test === undefined) {
                  setShowButton(false);
                } else {
                  setShowButton(true);
                }
              }
            });
          }
          setTotalQs(storage.length);
          setQuestions(storage);
        })
    }
  }, [prodID]);

  useEffect(() => {
    if (prodID) {
      var storage = [];
      var test;
      getQs(prodID, 1, (totalQs*30))
        .then((response) => {
          if (response.data !== []) {
            response.data.forEach((item) => {
              if (storage.length !== totalQs) {
                var count = 0;
                for (var a in item.answers) {
                  count++;
                }
                storage.push([item.question_id, item.question_body, item.question_helpfulness, count]);
                setShowButton(false);
              }
              else if (test === undefined) {
                test = item.question_id;
                if (test === undefined) {
                  setShowButton(false);
                } else {
                  setShowButton(true);
                }
              }
            });
          }
          setTotalQs(storage.length);
          setQuestions(storage);
        })
    }
  }, [refreshQ]);


  const moreQuestions = () => {
    var storage = [];
    var test;
    getQs(prodID, 1, (totalQs+2)*30)
      .then((response) => {
        if (response.data !== []) {
          response.data.forEach((item) => {
            if (storage.length !== (totalQs+2)) {
              var count=0;
              for (var a in item.answers) {
                count++;
              }
              storage.push([item.question_id, item.question_body, item.question_helpfulness, count]);
            }
          });
        }
        if (storage) {
          var newQs = storage.slice(totalQs);
          setQuestions([...questions, ...newQs]);
          setTotalQs(storage.length);
        }
        setRefreshQ(!refreshQ);
      });
  };

  return(
    <div className="main">
      <h1 className="title">Questions & Answers</h1>
      <SearchBar questions={questions} setFiltered={setFiltered}/>
      <div className="questions-list">
        {filtered.length > 0 ? filtered.map((question, index)=>
          <div className="questions" key={index} data-testid = "questions">
            <Questions key={question[0]} question={question} refreshQ={refreshQ} setRefreshQ={setRefreshQ} prodName={prodName}/>
          </div>
        ) : null}
      </div>
      <div className="footer">
        {showButton ? <button className="buttons" onClick={()=> {moreQuestions()}}>MORE ANSWERED QUESTIONS</button> : null}
        <button className="buttons" onClick={() => setQModal(true)}>ADD A QUESTION +</button>
      </div>
      {QModal && <QuestionModal prodID={prodID} prodName={prodName} setQModal={setQModal} refreshQ={refreshQ} setRefreshQ={setRefreshQ} totalQs={totalQs} setTotalQs={setTotalQs}/>}
    </div>
  )
};


export default QuestionsAndAnswers;