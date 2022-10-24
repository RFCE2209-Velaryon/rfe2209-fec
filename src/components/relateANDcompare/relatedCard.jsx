import React from "react";
import getProduct from '../../lib/getProduct.js';
import axios from 'axios';
import CompareModal from './compareModal.jsx';
import $ from 'jquery';


const {useState, useEffect} = React;
const apiurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
const RelatedCard = (props) => {
  let [displayItems, setDisplayItems] = useState([<div>loading...</div>]);
  let [comProduct, setComProduct] = useState({name:'',features:['test']});
  let [modal, setModal] = useState(false);
  let [allFeatures, setAllFeatures] = useState({});

  useEffect(()=>{
    let itemHolder = [];
    itemHolder.push(getProductData(props.productID).then((proData)=> {
      return getProductStyle(props.productID).then((styleData) => {
        return getProductStars(props.productID).then((starData) => {
          getAllFeatures(props.curProduct, {'name': proData.data.name, 'features': proData.data.features})
          let stars = setStars(starData.data.ratings);
          let imgSrc = () => {
            if (styleData.data.results[0].photos[0].url) {
              return styleData.data.results[0].photos[0].url;
            } else {
              return 'https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'
            }
          }
          return (
            <div style={{border: 1 + 'px solid black', width: 250+'px', height: 300+'px', margin: 5+'px', backgroundColor:'white'}}>
              {
                props.isRelated ?
                  <div style={{position:'relative'}}>
                    <button onClick={(e) => {toggleModal()}}style={{position: 'absolute', right: 1+'px', top: 1+'px'}}>&#9733;</button>
                  </div>:
                  <div style={{position:'relative'}}>
                    <button onClick={(e) => {removeOutfit()}}style={{position: 'absolute', right: 1+'px', top: 1+'px'}}>&#10008;</button>
                  </div>

              }
              <div style={{height: 200+'px', backgroundColor: 'black'}}>
                <img style={{height: '100%', width: '100%', objectFit: 'contain'}} src={imgSrc()}></img>
              </div>
              <div>{proData.data.name}</div>
              <div>{proData.data.category}</div>
              <div>${proData.data.default_price}</div>
              <div style={{position: 'relative'}}><div style={{zIndex:1, width: 200+'px', height: 25+'px', position:'absolute'}}><img style={{width: '100%', height: '100%'}}src={'https://drive.google.com/uc?export=view&id=1ubX7q_pi7hyS9w2cHCc7gau33lt7B3SR'}></img></div><div style={{zIndex:0, width: ((stars/5)*200)+'px', height: 25+'px', position:'absolute', backgroundColor:'yellow'}}></div></div>
            </div>
          );
        })
      })
    }));
    Promise.all(itemHolder).then(items=> {
      setDisplayItems(items);
    })
  },[]);

  let getProductData = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id
    })
  }

  let getProductStyle = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'products/'+id+'/styles'
    })
  }

  let getProductStars = (id) => {
    return axios({
      method: 'get',
      url: apiurl+'reviews/meta',
      params: {product_id: id}
    })
  }
  let setStars = (starData) => {
    let keys = Object.keys(starData);
    let count = 0;
    let total = 0;
    keys.forEach(key => {
      count += Number(starData[key]);
      total += (Number(starData[key]) * key);
    });
    return (Math.round((total / count)*4)/4);
  }

  let getAllFeatures = (pageProduct, cardProduct) => {
    setComProduct(cardProduct);
    let comparedFeatures = {};

    pageProduct.features.forEach(feat => {

      if(feat.value === null) feat.value = <>&#10003;</>;
      comparedFeatures[feat.feature] = [feat.value];
    });
    cardProduct.features.forEach(feat => {
      if(feat.value === null) feat.value = <>&#10003;</>;
      if(comparedFeatures[feat.feature]) {
        comparedFeatures[feat.feature][1] = feat.value;
      } else {
        comparedFeatures[feat.feature] = [];
        comparedFeatures[feat.feature][1] = feat.value;
      }
    });

    let featuresArray = [];
    let feats = Object.keys(comparedFeatures);
    feats.forEach(feat=> {
      featuresArray.push([comparedFeatures[feat][0], feat, comparedFeatures[feat][1]]);
    })
    setAllFeatures(featuresArray);

  }

  let toggleModal = () => {
    $('body').toggleClass('stop-scrolling');
    setModal((prevModal)=> {
      return !prevModal
    });
  }

  let removeOutfit = () => {
    console.log('remove outfit');
  }

  return(
    <>
      {displayItems.map((item, i)=>{return (
        <div key={i} >
          {item}
          {modal ? <CompareModal onClick={(e) => {toggleModal()}} curProduct={props.curProduct} comProduct ={comProduct} allFeatures={allFeatures}/> : null}
        </div>
      )})}


    </>
  )
};

export default RelatedCard;