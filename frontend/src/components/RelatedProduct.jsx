import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

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
    <div>
      
    </div>
  )
}

export default RelatedProduct
