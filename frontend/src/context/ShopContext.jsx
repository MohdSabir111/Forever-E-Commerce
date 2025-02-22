import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const ShopContext = createContext();

 const ShopContextProvider = (props)=>{
  
    const currency = '$'
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false) 
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const addToCart = async (itemId, size)=>{
        if(!size){
          toast.error("Select the size");
          return;
        }

        // creating the Copy of cartItems 
      let cartData = structuredClone(cartItems);

      if(cartData[itemId]){
         if(cartData[itemId][size]){
             cartData[itemId][size] += 1;
             }else{
               cartData[itemId][size] = 1;
           }
      }else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1;
      }
      setCartItems(cartData)
  }

  //======== to calculate Total number in cart Icon in Navbar
   const getCartCount = ()=>{
     let totalCount = 0;
     console.log(cartItems)
      for( const items in cartItems){
        for( const item in cartItems[items]){
          try {
            if(cartItems[items][item] > 0){
                totalCount += cartItems[items][item]
              }
             } catch (error) {
            
          }
        }
      }
      return totalCount;
   }

   //==== setting new quantity for a perticular item and to remove item from cart ui 
   const updateQuantity = async (itemId, size , quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData)
   }

   //============== TO calculate Total Amount in Cart ======
  
   const getCartAmount  = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items );
       for(const item in cartItems[items]){
         try {
           // console.log(cartItems["product1"]["sizeM"]) for understanding
            if(cartItems[items][item]>0){
              totalAmount += itemInfo.price * cartItems[items][item]

            }
         } catch (error) {
          
         }
       }
    }
     return totalAmount;
   }


    //======== to get the products from the backend
     const getProductsData = async ()=>{
      try {
          const response = await axios.get(backendUrl+"/api/product/list");
          if(response.data.success){
              setProducts(response.data.products);  
          }else{
            toast.error(response.data.message);
          }
      } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "error in fetching products");
      }

    }

    useEffect(()=>{
        getProductsData();
    } ,[]);

    useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
      
      }
    }
    ,[token]) 
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        token,setToken
    }

      return ( 
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
      )
 }

 export default ShopContextProvider;