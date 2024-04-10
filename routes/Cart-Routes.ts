import express from 'express';
import { addToCart , listCartItems , updateQuantityOnCart , deleteCart ,removeCartItem} from "../controllers/Cart-Controller"
import { verifyToken } from '../middleware/Verify-Token';
const cartRouter = express.Router();



//CART ROUTES
cartRouter.post('/add', verifyToken, addToCart);                         //ROUTE FOR ADD CART
cartRouter.get('/list', verifyToken, listCartItems);                     //ROUTE FOR SHOW CONTENTS ON CART
cartRouter.put('/update-quantity', verifyToken, updateQuantityOnCart);   //ROUTE FOR UPDATING QUANTITY ON CART 
cartRouter.patch('/remove-item', verifyToken, removeCartItem);           //ROUTE FOR REMOVE SINGLE ITEM FROM CART
cartRouter.delete('/remove', verifyToken, deleteCart);                    //ROUTE FOR REMOVE CART


export default cartRouter;