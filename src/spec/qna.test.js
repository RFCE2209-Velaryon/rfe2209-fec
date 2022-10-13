import renderer from 'react-test-renderer';
import React from 'react';

import QuestionsAndAnswers from '../components/Q&A/qna.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<QuestionsAndAnswers />)
    .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
 });