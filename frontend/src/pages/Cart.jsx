import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';


function Cart() {

  const {currency, products, cartItems, updateQuantity} = useContext(ShopContext);
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
    <div className='pt-14 border-t' >
        <div className='text-2xl mb-3' >
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        
    {
      cartData.map((item, index)=>{
        const productData = products.find((product)=> product._id === item._id)

    return(
      <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-col-[4fr_2fr_0.5fr] items-center gap-4 ' >
         <div className='flex items-start gap-6 ' >
          <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
          <div>
            <p className='text-xs sm:text-lg font-medium' >{productData.name}</p>
            <div className='flex gap-5 mt-2 items-center'>
              <p>{currency}{productData.price} </p>
            <p className=' border bg-slate-50 px-2 sm:px-3 sm:py-1 ' >{item.size} </p>
            </div>
          </div>
         </div>
          <input onChange={(e)=>e.target.value==='' || e.target.value === '0' ? null :updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 sm:px-2 py-1 ' type="number" min={1} defaultValue={item.quantity} />
          <img onClick={()=>updateQuantity(item._id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
      </div>
    )
      })
    }
    </div>


  )
}

export default Cart
