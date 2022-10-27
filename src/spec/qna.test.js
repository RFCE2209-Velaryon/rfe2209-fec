import renderer from 'react-test-renderer';
import React from 'react';

import QuestionsAndAnswers from '../components/Q&A/qna.jsx';

it('renders correctly', () => {
  const tree = renderer //tree makes snapshot (html comparison of component) - snapshot is what we expect
    .create(<QuestionsAndAnswers />)
    .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
 });