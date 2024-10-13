import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import Title from './../components/Title';

function Product() {
   const {productId} = useParams()
   const {products, currency} = useContext(ShopContext);
   const [productData, setProductData] = useState(false);
   const [ image, setImage] = useState('');
   const [size, setSize] = useState('');


   const fetchProductData = async ()=>{

   }
     
    useEffect(()=>{
        products.map((item)=>{
         if(item._id === productId ){
          setProductData(item);
          setImage(item.image[0])
          return null;
         }
        })

    },[productId , products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100' >
      {/** Product Data */}
       <div className='flex gap-12 sm:gap-12  sm:flex-row  flex-col' >

      {/** Product Images  */}
         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row' >
             <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full  ' >
                {
                  productData.image.map((item, index)=>(
                    <img onClick={()=>setImage(item)} src={item} key={index}  alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
                  ))
                }
             </div>

                 {/** main image */}
                 <div className='w-full sm:w-[80%]' >
                    <img src={image} alt="" className='w-full h-auto' />
                 </div>
            </div>
            {/** ==== Product Info section  ==== */}
                <div className='flex-1 '>
                  <h1 className='font-medium text-2xl mt-2 ' >{productData.name }</h1>
                  <div className='flex items-center gap-1 mt-2' >
                  <img src={assets.star_icon} alt="" className='w-3 5' />
                  <img src={assets.star_icon} alt="" className='w-3 5' />
                  <img src={assets.star_icon} alt="" className='w-3 5' />
                  <img src={assets.star_icon} alt="" className='w-3 5' />
                  <img src={assets.star_dull_icon} alt="" className='w-3 5' />
                  <p className='pl-2' >(122)</p>
                </div>

                <p className='font-medium text-3xl mt-5' >{currency}{productData.price} </p>
                <p className='mt-5 text-gray-500 md:w-4/5' > {productData.description} </p>

                <div className='flex flex-col gap-4 my-8' >
                  <p>Select Size </p>
                    <div className='flex gap-2 mt-5' >
                      {productData.sizes.map((item, index)=>(
                      <button key={index} onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item == size ? 'border-orange-400':''} `} >{item} </button>
                    ))}
                  </div>
                </div>

                <button className='bg-black text-white px-8 p-3 text-sm active:bg-gray-700' >ADD TO CART</button>
                <hr className='sm:w-4/5 mt-8' />
                 <div className='flex flex-col gap-1 text-sm mt-5 text-gray-500'>
                  <p>100% Original Product.</p>
                  <p>Cash On Delivery On This Product </p>
                  <p>Return & Exchange Policy Within 7 Days. </p>
                 </div>
                </div>
              </div>

   {/**======Decription and Review Section */}

   <div className='mt-20' >
    <div className='flex ' >
      <b className=' border text-sm px-3 py-5' >Decription</b>
      <p className=' border text-sm px-3 py-5'>Reviews</p>
    </div>
    <div className='border flex  flex-col gap-4 text-sm text-gray-400 p-6'>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, vel. Dolorum recusandae ad nam, consectetur iure repudiandae velit. Iure, quo. Autem culpa fugit, harum sequi sed tenetur voluptates libero? Temporibus?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae porro, doloribus aliquam mollitia a nulla tenetur sit soluta esse ex laboriosam voluptate eveniet ullam aperiam quasi dolore? Iure, similique.</p>
    </div>
   </div>

   { /**  ===== Display Related Product Section ======  */ }
    
    <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    
            
    </div>
  ) : <div className='opacity-0' ></div>
}

export default Product
