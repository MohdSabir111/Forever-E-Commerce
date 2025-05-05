import express from 'express';
import {loginUser, registerUser, adminLogin, userProfile} from '../controllers/userController.js'
import authUser from '../middleware/auth.js';
 
const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/profile',authUser,userProfile);
userRouter.post('/admin',adminLogin);



//-------------exporting---------------
export default userRouter;
