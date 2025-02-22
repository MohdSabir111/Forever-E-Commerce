
import userModel from './../models/userModel';
// add product to user cart
const addToCart = async (req, res) => {
   try {
    const {userId, itemId, size} = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if(cartData[itemId]){
       if(cartData[itemId][size]){
           cartData[itemId][size] += 1;
       }else{
           cartData[itemId][size] = 1;
       }
    }else{
       cartData[itemId] = {};
       cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {cartData});
    return res.status(200).json({success : true , message : "Item Added to Cart Successfully "})    

   } catch (error) {
    
    console.error(error.stack);
    return res.status(404).json({success : false , message : "Unable to Add in Cart", error:error.message}) 
   }

}

// update user cart 
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity; 
        await userModel.findByIdAndUpdate(userId, {cartData});
        return res.status(200).json({success : true , message : "Cart Updated Successfully "})
        
    } catch (error) {
        console.error(error.stack);
        return res.status(404).json({success : false , message : "Unable to Update Cart", error:error.message}) 
    }
}


// get user cart
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        return res.status(200).json({success : true , message : "Cart Data", data: userData.cartData})
        
    } catch (error) {
        console.error(error.stack);
        return res.status(404).json({success : false , message : "Unable to Get Cart", error:error.message}) 
        
    }
}


export { addToCart, updateCart, getUserCart } 
