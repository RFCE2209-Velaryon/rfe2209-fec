import React, {useState, useEffect} from "react";



const Info = ({product, items}) => {
  const [sale, setSale] = useState("")

  const onSale = () => {
    if(items.sale_price === null){
      setSale(items.original_price)
    } else if (items.sale_price !== null){
      setSale(items.sale_price)
    }
  }

  useEffect(()=>{
    onSale()
  })

  return (
    <div className='infoWrapper'>
      <div className='infoDetailCategory'>Category: {product.category}</div>
      <div className='infoDetailName'>{product.name}</div>
      <div  className='infoDetailPrice' style={ {color: items.sale_price === null ? "black" :'red'}}>{`$ ${sale}`}</div>
    </div>
  );
}

export default Info;