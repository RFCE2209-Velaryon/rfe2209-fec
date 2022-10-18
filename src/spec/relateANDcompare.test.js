import renderer from 'react-test-renderer';
import React from 'react';

import Related from '../components/relateANDcompare/relateANDcompare.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Related />)
    .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
 });