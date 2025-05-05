import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';  
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

function Orders({token}) {
  const [orders, setOrders] =useState([]);


  const fetchAllOrders = async () => {
  try {
    if(!token){
      return null;
    }
    const response = await axios.post(backendUrl+"/api/order/list",{},{ headers: { token } });
    if(response.data.success){
      setOrders(response.data.orders.reverse());
    }
  } catch (error) {
         toast.error(error.response.data.message);
         console.log(error.response.data.error)
  }
  };
       const statusHandler = async (event , orderId) => {
        try {
          if(!token){
            return null;
          }
          const response = await axios.post(backendUrl+"/api/order/status",{orderId,status:event.target.value},{ headers: { token } });
          if(response.data.success){
            // for fetching the updated order status
            await  fetchAllOrders();
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        // data.error is the message from the backend, best way to check backend error
         console.log(error.response.data.error)
         
        
        }  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div>
        <h3>Orders Page</h3>
         <div>
            {
              orders.map((order,index)=>(
                <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-60 p-5 md:p-8 m-3 md:m-4 text-xs sm:text-sm text-gray-700 ' >
                  <img className='w-12' src={assets.parcel_icon} alt="" />  
                  <div>
                    <div className='FIRST' >
                      {
                        order.items.map((item,index)=>{
                          if(index === order.items.length-1){
                            return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span> </p>
                          }else{
                            return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span> , </p>
                          }
                        })
                      }
                    </div>
                    <p className='mt-3 mb-3 font-medium'>{order.address.firstName + " " +order.address.lastName} </p>
                    <div className='SECOND'>
                      <p>{order.address.street+","}</p>
                      <span>{order.address.city+","}</span>
                      <span>{order.address.state+","}</span>
                      <span>{order.address.country+","}</span>
                      <span>{order.address.zipCode}</span>
                    </div>
                    <p>{order.address.phone}</p>
                </div>
                      <div className='THIRD'>
                        <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                        <p className='mt-3'>Method : {order.paymentMethod} </p>
                        <p>Payment : {order.payment ?  "Done" :"Pending"} </p>
                        <p>Date {new Date(order.date).toLocaleDateString()}</p>
                      </div> 
                      <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                      <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='FORTH font-semibold p-2' >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
               </div>
              ))
            }
         </div>
    </div>
  )
}

export default Orders
