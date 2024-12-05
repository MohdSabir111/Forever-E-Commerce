import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name : {type :String, required: true},
  email : {type :String, required: true, unique:true},
  password : {type :String, required: true},
  cartData : {type :Object, default:{}},
},{minimize:false}); // bcz mongoDb don't show the empty data,to show the cartData i use this

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;
