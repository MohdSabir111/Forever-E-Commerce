import userModel from '../models/userModel.js';
import orderModel from './../models/orderModel.js';


// ===Placing order using COD ===
 const placeOrder = async (req, res) => {
   try {
        const {userId,items ,amount , address } = req.body;
         const oderData = {
          userId,
          items,
          amount,
          address,
          paymentMethod : 'COD',
          payment : false,
          date: new Date()
         }

         const newOrder = await orderModel.create(oderData)
         await newOrder.save();
                 //resetting the cart data
         await userModel.findByIdAndUpdate(userId,{cartData:{}});
         res.status(200).json({success:true, message : 'Order Placed Successfully', order : newOrder});
   } catch (error) {
      console.error(error.stack);
      return res.status(404).json({success : false , message : "Unable To Place Order ", error:error.message})
   }
 
}

// ===Placing   order  using Stripe Method  ===
const placeOrderStripe = async (req, res) => {}

//====== placing order using Razorpay Method =====
const placeOrderRazorpay = async (req, res) => {}

// ====== All order for Admin Panel =====
 const allOrders = async (req, res) => {}


 //===== User Orders Data For FrontEnd ==============
  const userOrders = async (req, res) => {}

  //===== Update Order Status from admin panel  ==============
    const updateStatus = async (req, res) => {}


 // ======== Exporting the functions ============   

    export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}