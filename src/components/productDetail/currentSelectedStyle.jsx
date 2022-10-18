import React from "react";
import {useState, useEffect} from "react"




const CurrentSelectedStyle = ({items}) => {
  const [productImage, setProductImage] = useState("")
 console.log(items)



  const styles = {
    logo: {
      height: 50,
      width: 50,
      borderRadius:150,
      borderWidth: 5,
      borderColor:'white',
    }
  };


  return(
    <div>
      {/* {items.map((item)=>{ */}
         <img src= "https://reactjs.org/logo-og.png" alt="react logo" style={styles.logo}/>
      {/* })} */}

    </div>

  )
};

export default CurrentSelectedStyle;