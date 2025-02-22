import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import cartRouter from './routers/cartRouter.js';

//-------------- Config --------------------
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

// ---------- middlewares ------------
app.use(express.json());
app.use(cors());


// -------api endpoints-----------
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);

app.get('/',(req, res)=>{
    res.send("api is working ");
})


//------- Starting Server ------------ 
app.listen(port, ()=>{
    console.log(`Server is Starting on PORT ${port}`);
})