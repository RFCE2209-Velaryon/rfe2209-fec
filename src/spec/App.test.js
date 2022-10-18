import renderer from 'react-test-renderer';
import React from 'react';

import App from '../App.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
 });