// import express from 'express';
// import { isAuth } from '../middleware/authMiddleware.js';
// import {
//   linkShopifyAccount,
//   fetchShopifyProducts,
//   fetchShopifyInventory,
//   fetchShopifyOrders,
//   updateShopifyInventory,
// } from '../controllers/shopifyController.js';

// const shopifyRouter = express.Router();

// // Ensure user is authenticated
// shopifyRouter.use(isAuth);

// // Link Shopify Account
// shopifyRouter.route('/link').post(linkShopifyAccount);

// // Fetch Shopify Products
// shopifyRouter.route('/products').get(fetchShopifyProducts);

// // Fetch Shopify Inventory
// shopifyRouter.route('/inventory').get(fetchShopifyInventory);

// // Fetch Shopify Orders
// shopifyRouter.route('/orders').get(fetchShopifyOrders);

// // Update Shopify Inventory
// shopifyRouter.route('/inventory/update').post(updateShopifyInventory);

// export default shopifyRouter;

// import express from 'express';
// import { isAuth } from '../middleware/authMiddleware.js';
// import {
//   initiateShopifyAuth,
//   completeShopifyAuth,
//   fetchShopifyProducts,
//   fetchShopifyInventory,
//   fetchShopifyOrders,
//   updateShopifyInventory,
// } from '../controllers/shopifyController.js';

// const shopifyRouter = express.Router();

// // Ensure user is authenticated
// shopifyRouter.use(isAuth);

// // Initiate Shopify OAuth flow
// shopifyRouter.route('/auth/initiate').get(initiateShopifyAuth);

// // Complete Shopify OAuth flow
// shopifyRouter.route('/auth/complete').post(completeShopifyAuth);

// // Fetch Shopify Products
// shopifyRouter.route('/products').get(fetchShopifyProducts);

// // Fetch Shopify Inventory
// shopifyRouter.route('/inventory').get(fetchShopifyInventory);

// // Fetch Shopify Orders
// shopifyRouter.route('/orders').get(fetchShopifyOrders);

// // Update Shopify Inventory
// shopifyRouter.route('/inventory/update').post(updateShopifyInventory);

// export default shopifyRouter;

import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import {
  initiateShopifyAuth,
  completeShopifyAuth,
  fetchShopifyProducts,
  fetchShopifyInventory,
  fetchShopifyOrders,
  updateShopifyInventory,
} from '../controllers/shopifyController.js';

const shopifyRouter = express.Router();

// Ensure user is authenticated
// shopifyRouter.use(isAuth);

// Initiate Shopify OAuth flow
shopifyRouter.route('/auth/initiate').get(initiateShopifyAuth);

// Complete Shopify OAuth flow
shopifyRouter.route('/auth/complete').post(completeShopifyAuth);

// Fetch Shopify Products
shopifyRouter.route('/products').get(fetchShopifyProducts);

// Fetch Shopify Inventory
shopifyRouter.route('/inventory').get(fetchShopifyInventory);

// Fetch Shopify Orders
shopifyRouter.route('/orders').get(fetchShopifyOrders);

// Update Shopify Inventory
shopifyRouter.route('/inventory/update').post(updateShopifyInventory);

export default shopifyRouter;