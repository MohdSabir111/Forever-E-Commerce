import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';


const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints 
app.get('/',(req, res)=>{
    res.send("api is working ");
})

app.listen(port, ()=>{
    console.log(`Server is Starting on PORT ${port}`);
})