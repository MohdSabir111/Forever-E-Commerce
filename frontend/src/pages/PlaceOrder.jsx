import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { backendUrl } from './../../../admin/src/App';
import { toast } from 'react-toastify';
import axios from 'axios';



function PlaceOrder() {
  const [method , setMethod] = useState('cod');
  const {navigate,token,backendUrl, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [formData , setFormData] = useState({
    firstName : '',
    lastName : '',
    email : '',
    street : '',
    city : '',
    state : '',
    zipCode : '',
    country : '',
    phone : '',
  });
    const onChangeHandler = (e) => {
      const {name , value} = e.target;
      setFormData(data=>({ ...data , [name] : value}));
    } 

   const onSubmitHandler = async (event) => {
      event.preventDefault();
     try {
      const orderItems =[];
      for (let items in cartItems) {
        for (let size in cartItems[items]) {
         if(cartItems[items][size] > 0){
          const itemInfo = structuredClone(products.find(product=>product._id === items));
         if(itemInfo){
          itemInfo.quantity = cartItems[items][size];
          itemInfo.size = size;
          orderItems.push(itemInfo);
         }
        }
        }
      let orderData = {
        items : orderItems,
        amount : getCartAmount() + delivery_fee,
        address : formData
      }

      switch(method){
        case 'cod': const response = await axios.post(backendUrl +'/api/order/place', orderData, {headers : {token}});
        console.log(response.data)
        if(response.date.success){
          setCartItems({});
          navigate('/orders');
        }else{
          toast.error(response.data.message);
        }
        break;
        case 'stripe': const stripeResponse = await axios.post(backendUrl+'/api/order/stripe', orderData, {headers : {token}});
        break;
        case 'razorpay': const razorpayResponse = await axios.post(backendUrl+'/api/order/razorpay', orderData, {headers : {token}});
        break;
          default : break;
      }
   
      }
  
     } catch (error) {
      
     }
   }
 
  return (
    <form   onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:14 min-h-[80vh] border-t ' >
     
      {/**===== Left Side ========= */}
     <div className='flex flex-col gap-4 w-full sm:max-w-[480px] ' >
          <div className='text-xl sm:2xl my-3' >
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3' >
             <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="text" placeholder='First Name' />
             <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="text" placeholder='Last Name' />       
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="email" placeholder='Enter Email ' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="text" placeholder='Street' />
          <div className='flex gap-3' >
             <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="text" placeholder='City' />
             <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="text" placeholder='State' />       
          </div>
          <div className='flex gap-3' >
             <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="number" placeholder='ZipCode' />
             <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="text" placeholder='Country' />       
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded w-full py-1.5 px-3.5  ' type="number" placeholder='Phone' />
      </div>
     
     {/**========= Right Side  */}
      <div className='mt-8' >
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
          <div className='mt-12' >
            <Title text1={'Payment'} text2={'Method'} />
            {/** Payment method selection  */}
            <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : '' }  `} ></p>
                  <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                </div>
                <div  onClick={()=>setMethod('razorpay')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : '' } `} ></p>
                  <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                </div>
                <div  onClick={()=>setMethod('cod')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : '' }  `} ></p>
                  <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY </p>
                </div>
            </div>
             
             <div className='w-full text-end mt-8 ' >
                 <button type='submit' className='bg-black text-white px-16 py-3 text-sm' >Place Order</button>
             </div>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
