import {render, screen, waitFor, cleanup} from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import renderer from 'react-test-renderer';

import QuestionsAndAnswers from '../components/Q&A/qna.jsx';

jest.mock('axios');

const dummyQuestions = {
  "product_id": 37311,
  "results": [{
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
      }
    }
  }]
};

describe('q&a.jsx axios call', () => {
  beforeAll(() => {
    axios.get.mockResolvedValue({data: dummyQuestions});
  });
  it ('render questions', async () => {
    render(<QuestionsAndAnswers prodID={37311} prodName={'Camo Onesie'}/>);
    const questionInstances = await waitFor(() => screen.findAllByTestId('questions'));
    expect(questionInstances).toBeTruthy();
  });
});