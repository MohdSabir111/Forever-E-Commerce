import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from './../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';


function LatestCollection() {
 
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProdeuct]=useState([]);

    useEffect(()=>{
        
        setLatestProdeuct(products.slice(0,10))
    },[products])
            
  return (
    <div className='my-10' >
         <div className='text-center text-3xl py-8' >
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat debitis ullam error inventore delectus. Illo delectus asperiores atque quaerat ducimus beatae natus ipsa nulla iure hic, corrupti, sed nobis. Tempore!
             </p>
         </div>
        {/** Rendering products  */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ' >
                    {
                        latestProduct.map((item,index)=>(
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
            </div>

    </div>
  )
}

export default LatestCollection
