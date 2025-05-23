import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from './../middleware/adminAuth.js';
import authUser from './../middleware/auth.js';

const orderRouter = express.Router();

//================ Admin Features========
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// ================ Payment Features ============
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/razorpay',authUser, placeOrderRazorpay);

// ================ User Features ============
orderRouter.post('/userorders',authUser, userOrders);

// ================ verify the payment  ============
orderRouter.post('/verifystripe',authUser, verifyStripe);
orderRouter.post('/verifyrazorpay',authUser, verifyRazorpay);

export default orderRouter;
