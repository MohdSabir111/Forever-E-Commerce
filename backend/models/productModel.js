import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
     name : {tyep:String, required:true},
     description  : {tyep:String, required:true},
     price : {tyep:Number, required:true},
     image : {tyep:Array, required:true},
     category : {tyep:String, required:true},
     subCategory : {tyep:String, required:true},
     sizes : {tyep:Array, required:true},
     bestseller : {type:Boolean},
     date : {tyep:Number, required:true},
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel;