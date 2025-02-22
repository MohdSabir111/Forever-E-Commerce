import validator from 'validator';
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET);
}


//---------- user registration --------

const registerUser = async (req, res) => {
   
    try {
       const {name, email, password} = req.body;
       //checking if user is already exists or not
       const exists  = await userModel.findOne({email});
       if(exists){
        return res.status(400).json({success:"failed" , message:"User is already exists"})
       }
       if(!validator.isEmail(email)){
        return res.status(400).json({success:"failed" , message:"Please Enter A valid Email"})
       }
       if(password.length < 8){
        return res.status(400).json({success:"failed" , message:"Please Enter A Strong Password with minimum 8 characters"})
       }

//-===  Hashing The Password 
   
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       const newUser = await new userModel({name, email, password:hashedPassword});
       const user = await newUser.save();
// create the Token 
    const token = createToken(user._id)
    res.status(201).json({success:true, token})
        
    } catch (error) {
     console.log(error);
     res.status(400).json({success:false, message:"User Registeration Failed", error:error.message});    
    }
}


//---------- User Login  ----------------------
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({success : false , message : "User Does'nt Exists"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        const token = createToken(user._id);
        res.status(200).json({success:true, token})
    }else{
        return res.status(404).json({success : false , message : "Invalid Email or Password"})   
    }

  } catch (error) {
    return res.status(404).json({success : false , message : "Login Failed", error:error.message})
  }
    
}



//---------- Admin Login  --------

const adminLogin = async (req, res) => {
  try {
    const {email, password } = req.body;
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.JWT_SECRET)
        return res.status(200).json({success:true, token}) 
      }else{
        return res.status(404).json({success : false , message : "Invalid Email or Password"})   
      }

  } catch (error) {
    console.error(error.stack);
    return res.status(404).json({success : false , message : "Admin Login Failed", error:error.message})
  }
    
}


//------------exporting-------------------

export {loginUser, registerUser, adminLogin}