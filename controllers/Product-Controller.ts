import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express'; 
import ProductModel from '../models/Product';
import AppError from '../Utils/CustomError';
import HttpStatusCodes from '../config/HttpStatusCodes';
import mongoose from 'mongoose';



//ADD PRODUCT WITH DETAILS
export const addProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, description, price, images, rating } = req.body;
        if (!name || !description || !price || !images ){
            throw new AppError(
                'Missing required fields on products!',
                HttpStatusCodes.NOT_FOUND 
            );
        }
        const newProduct = new ProductModel({
            name,
            description,
            price,
            images,
            rating
        });
        await newProduct.save();
        res.status(201)
        .json(
            {
                message: 'Product added successfully',
                product: newProduct
            }
        );
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
});



//LIST PRODUCTS
export const listProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ products }); 
    } catch (error) {
        console.error('Error on listing products:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
});




//UPDATE THE PRODUCT DETAILS
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { productId }:{ productId?: string } = req?.query;
        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new AppError(
                    'Invalid product ID!',
                    HttpStatusCodes.BAD_REQUEST
                );
            }else{
                const { name, description, price, images, rating } = req.body;
                // Check if required fields are missing
                if (!name || !description || !price || !images) {
                    throw new AppError(
                        'Missing required fields on products!',
                        HttpStatusCodes.BAD_REQUEST
                    );
                }
                const updatedProductData = {
                name,
                description,
                price,
                images,
                rating
                };
                const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
                if (!updatedProduct) {
                   throw new AppError(
                   'Product with the specified ID not found!',
                    HttpStatusCodes.NOT_FOUND
                    );
                }
               res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });   
            }
        }          
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error:'Internal server error' });
    }
});



// REMOVE A PRODUCT BY IT'S ID
export const removeProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { productId }: { productId?: string } = req.query;
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new AppError('Invalid product ID!', HttpStatusCodes.BAD_REQUEST);
        }
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new AppError('Product with the specified ID not found!', HttpStatusCodes.NOT_FOUND);
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});