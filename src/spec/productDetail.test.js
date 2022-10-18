import renderer from 'react-test-renderer';
import React from 'react';

import Product from '../components/productDetail/productDetail.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Product />)
    .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
 });