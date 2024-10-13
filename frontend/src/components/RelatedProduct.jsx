import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

function RelatedProduct({category, subCategory}) {
     const { products } = useContext(ShopContext);
     const [related, SetRelated] = useState([]);

     useEffect(()=>{
        if(products.length > 0 ){
            let productCopy =  products.slice();
            productCopy = productCopy.filter((item)=> category === item.category)
            productCopy = productCopy.filter((item)=> subCategory === item.subCategory)
            SetRelated(productCopy.slice(0,5))
        } 

     },[products])

  return (
    <div className='my-24' >

    <div className='text-3xl py-5 text-center '  >
       <Title text1={"Related"} text2={"Collecton"} />
    </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ' >
                    {
                        related.map((item,index)=>(
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
            </div>
    </div>
  )
}

export default RelatedProduct
