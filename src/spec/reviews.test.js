import renderer from 'react-test-renderer';
import React from 'react';

import Reviews from '../components/reviews/reviews.jsx';
import Characteristic from '../components/reviews/Characteristic.jsx';
import ImgModal from '../components/reviews/ImgModal.jsx';
import RatingBreakdown from '../components/reviews/RatingBreakdown.jsx';
import Review from '../components/reviews/review.jsx';
import ReviewBody from '../components/reviews/ReviewBody.jsx';
import ReviewList from '../components/reviews/ReviewList.jsx';
import StarRating from '../components/reviews/StarRating.jsx';
import DropDown from '../components/reviews/DropDown.jsx';



describe("Renders Components Correctly" ,() => {

  // Test 1
  test('Reviews', () => {
    const product = {
      "id": 37311,
      "campus": "hr-rfe",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2021-08-13T14:37:33.145Z",
      "updated_at": "2021-08-13T14:37:33.145Z"
    }
    const tree = renderer
      .create(<Reviews product={product}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('Characteristic', () => {
    const tree = renderer
      .create(<Characteristic characteristic='Fit' value={3.0972222222222222} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('ImgModal', () => {
    const tree = renderer
      .create(<ImgModal photo={{"id":2456558,"url":"http://res.cloudinary.com/de2i2agjs/image/upload/v1666886937/r7k7es27yklyhlqju6ls.webp"}}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('RatingBreakdown', () => {
    const tree = renderer
      .create(<RatingBreakdown ratings={{"1":"50","2":"29","3":"82","4":"114","5":"291"}} filters={{"1":false,"2":false,"3":false,"4":false,"5":false}} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('Review', () => {
    const tree = renderer
      .create(<Review review={{"review_id":1277183,"rating":2,"summary":"do not report","recommend":true,"response":null,"body":"there weren't any 2 star reviews so it made my filter look like it was broken. Help me help you","date":"2022-10-25T00:00:00.000Z","reviewer_name":"FrodoSwaggins","helpfulness":20,"photos":[{"id":2456464,"url":"http://res.cloudinary.com/dqmnjwd2c/image/upload/v1666661253/departed_ete3as.jpg"}]}} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('ReviewBody', () => {
    const tree = renderer
      .create(<ReviewBody body='This is the body text of a review. It is indeed, some text, which goes, into a review.'/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('ReviewList', () => {
    const tree = renderer
      .create(<ReviewList reviews={[{"review_id":1277183,"rating":2,"summary":"do not report","recommend":true,"response":null,"body":"there weren't any 2 star reviews so it made my filter look like it was broken. Help me help you","date":"2022-10-25T00:00:00.000Z","reviewer_name":"FrodoSwaggins","helpfulness":20,"photos":[{"id":2456464,"url":"http://res.cloudinary.com/dqmnjwd2c/image/upload/v1666661253/departed_ete3as.jpg"}]},{"review_id":1277038,"rating":1,"summary":"There and back again","recommend":false,"response":null,"body":"A \"no\" on recommendation should change the metadata I get back","date":"2022-10-22T00:00:00.000Z","reviewer_name":"frodo","helpfulness":17,"photos":[]}]} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('StarRating', () => {
    const tree = renderer
      .create(<StarRating initialRating={3} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
   test('DropDown', () => {
    const tree = renderer
      .create(<DropDown choices={[{"label":"Relevance","value":"relevant"},{"label":"Helpfulness","value":"helpful"},{"label":"Date","value":"newest"}]} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
   });
});

// describe("Renders the text props given" ,() => {
//   test('ReviewBody', () => {
//     const tree = renderer.create(<ReviewBody body='This is the body text of a review. It is indeed, some text, which goes, into a review.' />);
//     tree.root.find(findInChildren(node =>
//       typeof node === 'string' &&
//       node === 'text of a review.'
//     ));
//   });
// });


// // helper functions
// function findInChildren (predicate) {
//   return testInstance => {
//     const children = testInstance.children
//     return Array.isArray(children)
//       ? children.some(predicate)
//       : predicate(children)
//   }
// }