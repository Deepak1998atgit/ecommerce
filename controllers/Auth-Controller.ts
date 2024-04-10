import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express'; 
import User from '../models/User';
import { userRegisterInterface,userLoginInterface} from '../types/User';
import AppError from '../Utils/CustomError';
import HttpStatusCodes from '../config/HttpStatusCodes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configKeys from '../config/configKeys';



// USER REGISTRATION
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user : userRegisterInterface = req.body;
    user.email = user?.email?.toLowerCase();
    const isEmailAlreadyRegisterd = await User.findOne({ email: user?.email });
    console.log(isEmailAlreadyRegisterd,"isEmailAlreadyRegisterd")
    if (isEmailAlreadyRegisterd){
      throw new AppError(
        'Employee with same email already exists...!',
        HttpStatusCodes.CONFLICT
      );
    }
    const isPhoneIsAlreadyExist=await User.findOne({mobile:user?.mobile})
    if(isPhoneIsAlreadyExist) {
      throw new AppError(
        'Employee with same Phone already exists...!',
        HttpStatusCodes.CONFLICT
      );
    }
    if (user.password) {
      user.password  = await bcrypt.hash(user?.password, 10);
    }else{
      throw new AppError(
        'Employee  with not Password while registering...!',
        HttpStatusCodes.NOT_FOUND
      );
    }
    const newEmployee = await new User(user);
    newEmployee.save()
    res.status(200).json({
      status: 'success',
      message: 'Successfully registered',
    });
});



//USER LOGIN
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const userData: userLoginInterface | null= req.body;
  const user = await User.findOne({ email: userData?.email });
  console.log("ok",user)
  if (!user){
    throw new AppError(
      'user not registered...!',
      HttpStatusCodes.NOT_FOUND
    );
  }
  if(userData?.password && user?.password) {
    const isPasswordCorrect = await bcrypt.compare(userData?.password, user?.password)
    if (!isPasswordCorrect) {
      throw new AppError(
        'Sorry, your password is incorrect. Please try again',
        HttpStatusCodes.UNAUTHORIZED
      );
    } else {
      const payload = {
        Id: user?._id,
        name:user?.firstName,
        email: user?.email,
        role: 'user'
      };
      const accessToken = jwt.sign({ payload }, configKeys?.JWT_SECRET, {
        expiresIn: '5h'
      });
      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        accessToken
      });
    }
  }
});


//USER LOGOUT
export const logoutUser= asyncHandler(async (req: Request, res: Response) => {
  req.session?.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    // Session destroyed successfully
    res.status(200).json({ message: 'Logout successful' });
  });
});
