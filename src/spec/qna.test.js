import renderer from 'react-test-renderer';
import React from 'react';

import QuestionsAndAnswers from '../components/Q&A/qna.jsx';
import Questions from "../components/Q&A/Questions.jsx";
import SearchBar from "../components/Q&A/SearchBar.jsx";
import QuestionModal from "../components/Q&A/QuestionModal.jsx";
import Answers from "../components/Q&A/Answers.jsx";
import AnswerModal from "../components/Q&A/AnswerModal.jsx";
import Answer from "../components/Q&A/Answer.jsx";

describe('Components Exist', () => {
  it('renders qna component correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<QuestionsAndAnswers />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('renders questions correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<Questions />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('renders searchbar correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<SearchBar />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('renders question modal correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<QuestionModal />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('renders answers correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<Answers />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('renders answer modal correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<AnswerModal />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('renders answer modal correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<Answer />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
});