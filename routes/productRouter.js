import express from 'express';
import { getProduct, uploadProduct } from '../controllers/productsController.js';
import { isAuth } from '../middleware/authMiddleware.js';


const productRouter = express.Router();

productRouter.route('/').post(isAuth , getProduct);
productRouter.route('/add').post(isAuth,uploadProduct);

export default productRouter;

