import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.status(401).json({success : false , message : " No Token  Please Login Again"})     
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(403).json({success : false , message : "Not Authorized Please Login Again"})   
        }

        next();
    } catch (error) {
        console.error(error.stack);
        return res.status(404).json({success : false , message : "Admin Auth Error", error:error.message})  
    }
}

export default adminAuth