import renderer from 'react-test-renderer';
import React from 'react';

import Related from '../components/relateANDcompare/relateANDcompare.jsx';
import RelatedCard from '../components/relateANDcompare/relatedCard.jsx';
import CompareModal from '../components/relateANDcompare/compareModal.jsx';
import Outfit from '../components/relateANDcompare/yourOutfit.jsx';

describe('Components Exist', () => {
  it('renders Related', () => {
    const tree = renderer
      .create(<Related />)
      .toJSON();
      console.log(tree)
      expect(tree).toMatchSnapshot();
   });
   it('renders RelatedCard', () => {
    const tree = renderer
      .create(<RelatedCard />)
      .toJSON();
      console.log(tree)
      expect(tree).toMatchSnapshot();
   });
   it('renders CompareModal', () => {
    const tree = renderer
      .create(<CompareModal />)
      .toJSON();
      console.log(tree)
      expect(tree).toMatchSnapshot();
   });
   it('renders Outfit', () => {
    const tree = renderer
      .create(<Outfit />)
      .toJSON();
      console.log(tree)
      expect(tree).toMatchSnapshot();
   });
});