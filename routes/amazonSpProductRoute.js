// import express from 'express';
// import { isAuth } from '../middleware/authMiddleware.js';
// import { createOrUpdateProduct, fetchOrders,fetchListing } from '../controllers/amazonSpController.js';


// const productListRouter = express.Router();

// productListRouter.route('/').post( fetchOrders);
// productListRouter.route('/getListing').get( fetchListing);
// productListRouter.route('/add').post(createOrUpdateProduct);

// export default productListRouter;



// import express from 'express';
// import { isAuth } from '../middleware/authMiddleware.js';
// // import { injectUserCredentials } from '../middleware/injectUserCredentials.js';
// import {createOrUpdateProduct, fetchListing, fetchOrders} from '../controllers/amazonSpController.js'
// // import { createOrUpdateProduct, fetchOrders, fetchListing } from '../controllers/amazonSpController.js';
// import { injectUserCredentials } from '../middleware/injectUserMiddleware.js';
// import { createShippingLabels, fetchDashboard, getFBAInventory, getInventoryDetails, getOrderDetails, processReturn, updateInventory, updateOrderStatus } from '../controllers/amazonController.js';

// const productListRouter = express.Router();

// // productListRouter.use(isAuth); // Ensure user is authenticated
// // productListRouter.use(injectUserCredentials); // Inject user credentials

// productListRouter.route('/').post(fetchOrders);
// productListRouter.route('/getListing').post(fetchListing);
// productListRouter.route('/add').post(createOrUpdateProduct);
// productListRouter.route('/getInventoryDetails').get(getInventoryDetails);
// productListRouter.route('/updateInventory').post(updateInventory);
// productListRouter.route('/getOrderDetails').get(getOrderDetails);
// productListRouter.route('/getFBAInventory').get(getFBAInventory);
// productListRouter.route('/createShippingLabels').post(createShippingLabels);
// productListRouter.route('/processReturn').post(processReturn);
// productListRouter.route('/fetchDashboard').get(fetchDashboard);
// productListRouter.route('/updateOrderStatus').post(updateOrderStatus);
// // productListRouter.route('/dashboard').post(fetchDashboard);

// export default productListRouter;


import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import { injectUserCredentials } from '../middleware/injectUserMiddleware.js';
import {
  createOrUpdateProduct,
  fetchListing,
  fetchOrders,
  createShippingLabels,
  fetchDashboard,
  getFBAInventory,
  getInventoryDetails,
  getOrderDetails,
  processReturn,
  updateInventory,
  updateOrderStatus,
  getFinancialEvents,
  getMarketplaceParticipations,
  getReports,
  submitReport,
  getReportDocument,
  fetchFinancialTransactions,
  getOrderAnalytics
} from '../controllers/amazonSpController.js';

const productListRouter = express.Router();

// productListRouter.use(isAuth); // Ensure user is authenticated
// productListRouter.use(injectUserCredentials); // Inject user credentials

productListRouter.route('/orders').post(fetchOrders);
productListRouter.route('/listing').post(fetchListing);
productListRouter.route('/product').post(createOrUpdateProduct);
productListRouter.route('/inventory/details').post(getInventoryDetails);
productListRouter.route('/inventory/update').post(updateInventory);
productListRouter.route('/order/details').post(getOrderDetails);
productListRouter.route('/inventory/fba').post(getFBAInventory);
productListRouter.route('/shipping/labels').post(createShippingLabels);
productListRouter.route('/returns/process').post(processReturn);
productListRouter.route('/dashboard').post(fetchDashboard);
productListRouter.route('/order/status').post(updateOrderStatus);
productListRouter.route('/financial/events').post(getFinancialEvents);
productListRouter.route('/marketplace/participations').post(getMarketplaceParticipations);
productListRouter.route('/reports').post(getReports);
productListRouter.route('/reports/submit').post(submitReport);
productListRouter.route('/reports/document').post(getReportDocument);
productListRouter.route('/financial').post(fetchFinancialTransactions);
productListRouter.route('/analytics').post(getOrderAnalytics);


export default productListRouter;