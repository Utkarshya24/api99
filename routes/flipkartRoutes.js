// import express  from 'express';
// const router = express.Router();
// // const { isAuthenticatedUser }
// const {
//   linkFlipkartAccount,
//   getFlipkartOrders,
//   getFlipkartProducts,
//   createFlipkartProduct,
//   updateFlipkartInventory
// } = require("./flipkartcontroller");

// router.post("/flipkart/link", isAuthenticatedUser, linkFlipkartAccount);
// router.get("/flipkart/orders", isAuthenticatedUser, getFlipkartOrders);
// router.get("/flipkart/products", isAuthenticatedUser, getFlipkartProducts);

// router.post("/flipkart/inventory", isAuthenticatedUser, updateFlipkartInventory);

// module.exports




import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
// import { injectUserCredentials } from '../middleware/injectUserCredentials.js';
import {createOrUpdateProduct, fetchListing, fetchOrders} from '../controllers/amazonSpController.js'
// import { createOrUpdateProduct, fetchOrders, fetchListing } from '../controllers/amazonSpController.js';
import { injectUserCredentials } from '../middleware/injectUserMiddleware.js';
import { createFlipkartProduct, getFlipkartOrders, getFlipkartProducts, getOrders, getProductDetails, linkFlipkartAccount, searchListings, updateFlipkartInventory } from '../controllers/flipkartController.js';
import { getFlipkartAccessToken } from '../utils/flipkartToken.js';

const flipkartInventoryRouter = express.Router();

// flipkartInventoryRouter.use(isAuth); // Ensure user is authenticated
// flipkartInventoryRouter.use(injectUserCredentials); // Inject user credentials

flipkartInventoryRouter.route('/link').post(linkFlipkartAccount);
flipkartInventoryRouter.route('/generate-token').post(getFlipkartAccessToken);
// flipkartInventoryRouter.route('/orders').get(getFlipkartOrders);
flipkartInventoryRouter.route('/orders').post(getOrders);
flipkartInventoryRouter.route('/products').post(getProductDetails);
flipkartInventoryRouter.route('/search-listing').post(searchListings);
// flipkartInventoryRouter.route('/products').get(getFlipkartProducts);
flipkartInventoryRouter.route('/inventory').post(updateFlipkartInventory);
flipkartInventoryRouter.route('/add-product').post(createFlipkartProduct);
// flipkartInventoryRouter.route('/dashboard').post(fetchDashboard);

export default flipkartInventoryRouter;
