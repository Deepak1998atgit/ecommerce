import express from 'express';
import { registerUser, loginUser, logoutUser } from "../controllers/Auth-Controller"
import { verifyToken } from '../middleware/Verify-Token';
const authRouter = express.Router();


//AUTH ROUTES
authRouter.post('/register',registerUser);            // ROUTE FOR REGISTER A USER
authRouter.post('/login',loginUser);                  // ROUTE FOR LOGIN A USER
authRouter.post('/logout',verifyToken,logoutUser);    // ROUTE FOR LOGOUT AND DELETE IF SESSION  DATA PRESENTS


export default authRouter;