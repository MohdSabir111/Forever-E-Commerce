import userModel from '../models/userModel.js';
import orderModel from './../models/orderModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

// global variables
const currency = 'inr'; // currency for stripe payment
const deliveryCharge = 10; // delivery charges for stripe payment

 // gatewaye initialize 
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 const razorpayInstace = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
 


// ===== 1. Placing order using COD ========
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

// ===== 2. Placing Order Using Stripe Method  =========
const placeOrderStripe = async (req, res) => {
  try {
    const {userId,items ,amount , address } = req.body;
    const {origin} = req.headers; // get the origin url from the request header
    const oderData = {
     userId,
     items,
     amount,
     address,
     paymentMethod : "Stripe",
     payment : false,
     date: new Date()
    }
    const newOrder = await orderModel.create(oderData)
    await newOrder.save(); 

    // to excute the payment use a variabble
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data:{
          name: item.name 
        },
        unit_amount : item.price * 100 // convert to cents 
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data:{
          name: 'Delivery Charges'
        },
        unit_amount : deliveryCharge * 100 // convert to cents 
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
   
    });

    res.status(200).json({success:true, message : 'Order Placed Successfully', order : newOrder, session_url: session.url});
  
  } catch (error) {
      console.error(error.stack);
      return res.status(404).json({success : false , message : "Unable To Place Order Using Stripe", error:error.message})
  }
}

 // ====== verify the payment status using stripe ===== 
  const verifyStripe = async (req, res) => {
    const {orderId,success,userId} = req.body;
    try {
      if(success === 'true'){
        await orderModel.findByIdAndUpdate(orderId, {payment : true});
        await userModel.findByIdAndUpdate(userId, {cartData : {}}); 
        return res.status(200).json({success:true , message : "Payment Verified Successfully"})
      }else{
        await orderModel.findByIdAndDelete(orderId); 
        return res.status(200).json({success:false , message : "Payment Failed"})
      }
      
    } catch (error) {
      console.error(error.stack);
      return res.status(404).json({success : false , message : "Unable To Verify Payment ", error:error.message})
      
    }
  }

//==== 3. Placing order using Razorpay Method ====
const placeOrderRazorpay = async (req, res) => {
  try {
    const {userId,items ,amount , address } = req.body;
    const oderData = {
     userId,
     items,
     amount,
     address,
     paymentMethod : "Razorpay",
     payment : false,
     date: new Date()
    }
    const newOrder = await orderModel.create(oderData)
    await newOrder.save(); 

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    }

    await razorpayInstace.orders.create(options, async (err, order) => {
      if (err) {
        console.error(err);
        return res.status(500).json({success : false , message : "Unable To Place Order Using Razorpay", error:err.message})
      } else {
        // Send the order details to the client
        res.status(200).json({success:true, message : 'Order Placed Successfully', orderId: order.id, order});
      }
    })


  } catch (error) {
     console.error(error.stack);
      return res.status(404).json({success : false , message : "Unable To Place Order Using Razorpay", error:error.message})
 
  }
}

const verifyRazorpay = async (req, res) => {
  try {
    const { userId,razorpay_order_id} = req.body;
    const orderInfo  = await razorpayInstace.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment : true});
      await userModel.findByIdAndUpdate(userId, {cartData : {}}); 
      return res.status(200).json({success:true , message : "Payment Verified Successfully"})
    }else{
      return res.status(200).json({success:false , message : "Payment Failed"})
    }

  } catch (error) {
    console.error(error.stack);
    return res.status(404).json({success : false , message : "Unable To verify Order Using Razorpay", error:error.message})

  }
}

// ====== All order for Admin Panel =====
 const allOrders = async (req, res) => {
   try {
       const orders = await orderModel.find({});
       res.status(200).json({success:true , orders});
      
   } catch (error) {
     console.error(error.stack);
     return res.status(404).json({success : false , message : "Unable To Fetch Orders ", error:error.message})
      
   }
 }


 //===== User Orders Data For FrontEnd ==============
  const userOrders = async (req, res) => {
    try {
      const {userId} = req.body;
      const orders = await orderModel.find({userId});
      res.status(200).json({success:true , orders});
    } catch (error) {
      console.error(error.stack);
      return res.status(404).json({success : false , message : "Unable To Fetch Orders ", error:error.message})
    }
  }

  //===== Update Order Status from admin panel  ==============
    const updateStatus = async (req, res) => {
      try {
        const {orderId, status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId,{status});
        res.status(200).json({success:true , message : 'Order Status Updated Successfully', order});
      
      } catch (error) {
        console.error(error.stack);
        return res.status(404).json({success : false , message : "Unable To Update Order Status  ", error:error.message, stack:error.stack})
      }
    }


 // ======== Exporting the functions ============   

    export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus,verifyStripe,verifyRazorpay}