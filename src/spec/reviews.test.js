import renderer from 'react-test-renderer';
import React from 'react';

import Reviews from '../components/reviews/reviews.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Reviews />)
    .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
 });