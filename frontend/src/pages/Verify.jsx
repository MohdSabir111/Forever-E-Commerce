import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Verify() {
    const {navigate, token, backendUrl, setCartItems} = useContext(ShopContext);
    const [searchParams,setSearchParams]= useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
          if(!token){
            return null;
        }
           
          const response = await axios.post(backendUrl+'/api/order/verifyStripe', {success,orderId},{headers:{token}});
          if(response.data.success){
            setCartItems({});
            navigate('/orders');
          }else{
            toast.error("Payment Failed");
            navigate('/cart');
          }
            
        } catch (error) {
                toast.error(error.response.data.message);
                console.log(error.response.data.error)
                console.log(error)
        }

    }

    useEffect(()=>{
      verifyPayment();
    },[token])
   

  return (
    <div>
      verify 
    </div>
  )
}

export default Verify
