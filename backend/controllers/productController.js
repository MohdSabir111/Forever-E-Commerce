import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

//-------------- Add product --------------
const addProduct = async (req, res) => {
   try {
     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
 
     // Extracting images from req.files
     //If req.files.image1 exists but is not an array or does not have an element at index 0, it evaluates to undefined.

     const image1 = req.files?.image1?.[0];
     const image2 = req.files?.image2?.[0];
     const image3 = req.files?.image3?.[0];
     const image4 = req.files?.image4?.[0];
 
     const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
 
     // Upload images to Cloudinary
     const image_url = await Promise.all(
       images.map(async (item) => {
         let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
         return result.secure_url;
       })
     );
 
     const productData = {
      name,
      description,
      category,
      price : Number(price),
      subCategory,
      bestseller : bestseller === "true" ? true : false,
      sizes : JSON.parse(sizes),
      image :image_url,
      date : Date.now()
    }

    const product =  new productModel(productData);
    await product.save();

    return res.status(200).json({success:true, message: "Product Added", data:product})
   } catch (error) {
     console.error(error.stack); // Log the full error stack for debugging
     return res.status(404).json({
       success: false,
       message: "Unable to add product",
       error: error.message,
     });
   }
 };
 

//-------------- List  product--------------

const listProducts = async (req, res) => {
  
    
}


//-------------- Removing  product--------------
const removeProduct = async (req, res) => {

    
}

//--------------Single Product Info --------------
const singleProduct = async (req, res) => {

    
}


//-------------- Export all Controllers--------------
 export {addProduct,listProducts,removeProduct,singleProduct}