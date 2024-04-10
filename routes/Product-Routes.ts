import express  ,{ Request, Response } from 'express';
import { addProduct , listProducts ,updateProduct ,removeProduct} from "../controllers/Product-Controller"
import { verifyToken } from '../middleware/Verify-Token';
const productRouter = express.Router();



//PRODUCT ROUTS
productRouter.post('/add',verifyToken,addProduct);          //ROUTE FOR ADDING A PRODUCT
productRouter.get('/lists',verifyToken,listProducts);       //ROUTE FOR LISTING ALL PRODUCTS
productRouter.put('/update',verifyToken,updateProduct);     //ROUTE FOR UPDATING A PRODUCT
productRouter.delete('/remove',verifyToken,removeProduct);  //ROUTE FOR REMOVE A PRODUCT


export default productRouter;