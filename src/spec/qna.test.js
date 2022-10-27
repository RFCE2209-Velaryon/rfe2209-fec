import renderer from 'react-test-renderer';
import React from 'react';

import QuestionsAndAnswers from '../components/Q&A/qna.jsx';
// import SearchBar from "./SearchBar.jsx";
// import Questions from "./Questions.jsx";
// import QuestionModal from "./QuestionModal.jsx";
// import Answers from "./Answers.jsx";
// import AnswerModal from "./AnswerModal.jsx";
// import Answer from "./Answer.jsx"



describe('Components Exist', () => {
  it('renders qna component correctly', () => {
    const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
      .create(<QuestionsAndAnswers />)
      .toJSON();
      console.log(tree)
      expect(tree).toMatchSnapshot();
   });
  //  it('renders searchbar correctly', () => {
  //   const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
  //     .create(<SearchBar />)
  //     .toJSON();
  //     console.log(tree)
  //     expect(tree).toMatchSnapshot();
  //  });
  //  it('renders questions correctly', () => {
  //   const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
  //     .create(<Questions />)
  //     .toJSON();
  //     console.log(tree)
  //     expect(tree).toMatchSnapshot();
  //  });
  //  it('renders question modal correctly', () => {
  //   const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
  //     .create(<QuestionModal />)
  //     .toJSON();
  //     console.log(tree)
  //     expect(tree).toMatchSnapshot();
  //  });
  //  it('renders answers correctly', () => {
  //   const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
  //     .create(<Answers />)
  //     .toJSON();
  //     console.log(tree)
  //     expect(tree).toMatchSnapshot();
  //  });
  //  it('renders answer modal correctly', () => {
  //   const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
  //     .create(<AnswerModal />)
  //     .toJSON();
  //     console.log(tree)
  //     expect(tree).toMatchSnapshot();
  //  });
  //  it('renders answer modal correctly', () => {
  //   const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
  //     .create(<Answer />)
  //     .toJSON();
  //     console.log(tree)
  //     expect(tree).toMatchSnapshot();
  //  });
});




