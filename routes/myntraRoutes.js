// import express from "express";

// import { createOrUpdateProduct, fetchInventory, fetchOrders } from "../controllers/myntraController";
// // import { isAuth } from '../middleware/authMiddleware';

// const myntraRouter = express.Router();

// // router.use(isAuth);

// myntraRouter.route('/product').post(createOrUpdateProduct);
// myntraRouter.route('/orders').get(fetchOrders);
// myntraRouter.route('/inventory').get(fetchInventory);

// export default myntraRouter;


import express from 'express';
// import { isAuth } from '../middleware/authMiddleware.js';
import { injectUserCredentials } from '../middleware/injectUserMiddleware.js';
import { createOrUpdateProduct, fetchOrders, fetchInventory } from '../controllers/myntraController.js';

const myntraRouter = express.Router();

// Apply middleware to all routes
// myntraRouter.use(isAuth);
myntraRouter.use(injectUserCredentials);

// Define routes
// myntraRouter.post('/product', createOrUpdateProduct);
// myntraRouter.get('/orders', fetchOrders);
// myntraRouter.get('/listing', fetchListing);
// myntraRouter.get('/inventory', fetchInventory);
myntraRouter.route('/product').post(createOrUpdateProduct);
myntraRouter.route('/orders').get(fetchOrders);
myntraRouter.route('/inventory').get(fetchInventory);

export default myntraRouter;