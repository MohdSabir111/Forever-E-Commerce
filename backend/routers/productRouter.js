import express from 'express';
import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();
//upload.fields() is a method to handle multiple fields, each potentially containing one or more files.
//[{name: "image1", maxCount: 1}, ...]:  name: The name of the field in the form (e.g., <input type="file" name="image1">).
//maxCount: The maximum number of files allowed for this field.
//addProduct:This is the controller function that handles the request after the files are processed and available in req.files.

productRouter.post('/add',upload.fields([{name:"image1", maxCount:1},{name:"image2", maxCount:1},{name:"image3", maxCount:1},{name:"image4", maxCount:1}]),addProduct);
    
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);

export default productRouter;