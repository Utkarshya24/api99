


import express from 'express';

import { cancelShipment, downloadLabelsPDF, fetchAllOrders, generateLabels, getInvoiceInfo, getShipmentDetails, getShipmentForms, getShipmentInfo, markReadyToDispatch, printShippingLabels, searchShipments } from '../controllers/flipkartOrderManagementController.js';

const flipkartOrderManagementRouter = express.Router();

// flipkartOrderManagementRouter.use(isAuth); // Ensure user is authenticated
// flipkartOrderManagementRouter.use(injectUserCredentials); // Inject user credentials

flipkartOrderManagementRouter.route('/search-shipment').post(searchShipments);
flipkartOrderManagementRouter.route('/all-order').post(fetchAllOrders);
flipkartOrderManagementRouter.route('/get-shipment-details').post(getShipmentDetails);
flipkartOrderManagementRouter.route('/generateLabels').post(generateLabels);
flipkartOrderManagementRouter.route('/printShippingLabels').post(printShippingLabels);
flipkartOrderManagementRouter.route('/downloadLabelsPDF').post(downloadLabelsPDF);
// flipkartOrderManagementRouter.route('/products').get(getFlipkartProducts);
flipkartOrderManagementRouter.route('/markReadyToDispatch').post(markReadyToDispatch);
flipkartOrderManagementRouter.route('/getShipmentInfo').post(getShipmentInfo);
flipkartOrderManagementRouter.route('/getInvoiceInfo').post(getInvoiceInfo);
flipkartOrderManagementRouter.route('/cancelShipment').post(cancelShipment);
flipkartOrderManagementRouter.route('/getShipmentForms').post(getShipmentForms);
// flipkartOrderManagementRouter.route('/dashboard').post(fetchDashboard);

export default flipkartOrderManagementRouter;
