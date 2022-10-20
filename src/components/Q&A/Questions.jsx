import React, { useState, useEffect } from "react";
import axios from "axios";
import Answers from "./Answers.jsx";

const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const Questions = ({questions}) => {
  return(
    <div>
      {questions.map((question) => {
        return(
          <div key={question[0]}><b>Q: {question[1]}</b>
            <div>A:
              <Answers qid={question[0]}/>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default Questions;