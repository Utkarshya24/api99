


import express from 'express';

import { createListings, fetchListings, getDashboardAnalytics, searchListings, updateListingInventory, updateListingPrices, updateListings } from '../controllers/flipkartInventoryManagementController.js';

const flipkartInventoryManagementRouter = express.Router();


flipkartInventoryManagementRouter.route('/createListings').post(createListings);
flipkartInventoryManagementRouter.route('/updateListings').post(updateListings);
flipkartInventoryManagementRouter.route('/fetchListings').post(fetchListings);
flipkartInventoryManagementRouter.route('/updateListingPrices').post(updateListingPrices);
flipkartInventoryManagementRouter.route('/updateListingInventory').post(updateListingInventory);
flipkartInventoryManagementRouter.route('/searchListings').post(searchListings);
flipkartInventoryManagementRouter.route('/dashboard-analytics').post(getDashboardAnalytics); // New route

export default flipkartInventoryManagementRouter;
