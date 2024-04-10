import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import AppError from '../Utils/CustomError';
import HttpStatusCodes from '../config/HttpStatusCodes';
import CartModel, { Cart } from '../models/Cart';
import { Types} from 'mongoose';
import ProductModel from '../models/Product';



//CREATE A CART 
export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user }: any = req;
        const userId = user?.payload?.Id;
        if (!Types.ObjectId.isValid(userId)) {      // Check if the user ID is valid
            throw new AppError(
                'Invalid user ID!',
                HttpStatusCodes.BAD_REQUEST
            );
        }
        let cart: Cart | null = await CartModel.findOne({ userId });
        if (!cart) {                                // If the cart doesn't exist, create a new one
            cart = new CartModel({
                userId,
                items: [],
                totalPrice: 0
            });
        }
        const { productId }: any = req?.query;
        if (!productId || !Types.ObjectId.isValid(productId)) {
            throw new AppError('Invalid product ID!', HttpStatusCodes.BAD_REQUEST);
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new AppError('Product not found!', HttpStatusCodes.NOT_FOUND);
        }
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);  
        if (existingItemIndex !== -1) {          
            cart.items[existingItemIndex].quantity++;
        } else {                                 
            cart.items.push({ productId , quantity: 1 });
        }
        await cart.calculateTotalPrice();       
        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//SHOW CART CONTENTS
export const listCartItems= asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user }: any = req;
        const userId = user?.payload?.Id;
        if (!Types.ObjectId.isValid(userId)) {
            throw new AppError(
                'Invalid user ID!',
                HttpStatusCodes.BAD_REQUEST
            );
        }
        const cart: Cart | null = await CartModel.findOne({ userId }).populate('items.productId');
        if (!cart) {
            throw new AppError('Cart not found!', HttpStatusCodes.NOT_FOUND);
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error listing cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
});



//UPDATE QTY ON THE CART PRODUCTS
export const updateQuantityOnCart=asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user }: any = req;
        const userId = user?.payload?.Id;
        
        if (!Types.ObjectId.isValid(userId)) {      
            throw new AppError(
                'Invalid user ID!',
                HttpStatusCodes.BAD_REQUEST
            );
        }
        let cart: Cart | null = await CartModel.findOne({ userId });
        if (!cart) {                                
            throw new AppError(
                'Cart not found!',
                HttpStatusCodes.NOT_FOUND
            );
        }
        console.log("ok par",req.params,"ok")
        const { productId, quantity }: any = req?.query;
        if (!productId || !Types.ObjectId.isValid(productId)) {
            throw new AppError('Invalid product ID!', HttpStatusCodes.BAD_REQUEST);
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new AppError('Product not found!', HttpStatusCodes.NOT_FOUND);
        }
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (existingItemIndex !== -1) {   
            const newQuantity = Math.floor(Number(quantity));
            if (newQuantity < 1 || !Number.isInteger(newQuantity)) {
                throw new AppError('Invalid quantity!', HttpStatusCodes.BAD_REQUEST);
            }
            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            throw new AppError('Product not found in the cart!', HttpStatusCodes.NOT_FOUND);
        }
        await cart.calculateTotalPrice();       
        await cart.save();
        res.status(200).json({ message: 'Quantity updated successfully', cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});



//REMOVE CART
export const deleteCart = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { user }: any = req;
        const userId = user?.payload?.Id;
        if (!Types.ObjectId.isValid(userId)) {      
            throw new AppError(
                'Invalid user ID!',
                HttpStatusCodes.BAD_REQUEST
            );
        }
       const deletedCart = await CartModel.findOneAndDelete({ userId });
       if (!deletedCart) {
           throw new AppError('No cart found for the provided user ID', HttpStatusCodes.NOT_FOUND);
       }
       res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//REMOVE ITEMS FROM CART
export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { productId }: { productId?: string } = req.query;
        const { user }: any = req;
        const userId = user?.payload?.Id;
        if (!Types.ObjectId.isValid(userId)) {    
            throw new AppError(
                'Invalid user ID!',
                HttpStatusCodes.BAD_REQUEST
            );
        }
        let cart: Cart | null = await CartModel.findOne({ userId });
        if (!cart) {                                
            throw new AppError('Cart not found!', HttpStatusCodes.NOT_FOUND);
        }
        if (!productId || !Types.ObjectId.isValid(productId)) {
            throw new AppError('Invalid product ID!', HttpStatusCodes.BAD_REQUEST);
        }
        const index = cart.items.findIndex(item => item.productId.toString() === productId);
        if (index === -1) {
            throw new AppError('Product not found in the cart!', HttpStatusCodes.NOT_FOUND);
        }
        cart.items.splice(index, 1);
        await cart.calculateTotalPrice();
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error : any) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: error?.message || 'Internal server error' });
    } 
});
