import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'


function Cart() {

  const {currency, products, cartItems} = useContext(ShopContext);
  const [cartData, setCartData] = useState([])
  
  useEffect(()=>{

    const tempData = [];
    for(const product in cartItems){
      for(const size in cartItems[product]){
          if(cartItems[product][size] > 0){
            tempData.push({
              _id : product,
              size : size ,
              quantity : cartItems[product][size] 
            })
         }
      }
    }
   setCartData(tempData)
  }, [cartItems])

  return ( 
    <div >
 
    </div>
  )
}

export default Cart
