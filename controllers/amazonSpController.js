// import axios from "axios";
// import moment from "moment";
// import querystring from "querystring";
// import { catchAsynHandler } from "../middleware/catchAsyncError.js";
// import { getAccessToken } from "../utils/amazonService.js";
// import { getListingStatus } from "../utils/amazonServiceToGetListing.js";

// const endpoint = "https://sellingpartnerapi-eu.amazon.com";
// const marketplaceId = process.env.MARKETPLACE_ID || "A21TJRUUN4KGV";
// const sellerId = process.env.SELLER_ID || "A2J55HVI221TF1";

// export const createOrUpdateProduct = catchAsynHandler(
//   async (req, res, next) => {
//     const productData = req.body;
// console.log(productData,"prod data")
//     try {
//       const accessToken = await getAccessToken();

//       const createListingUrl = `${endpoint}/listings/2021-08-01/items/${productData?.sellerId?productData?.sellerId:sellerId}/${productData.sku}?marketplaceIds=${productData?.marketplaceId?productData?.marketplaceId:marketplaceId}`;
//       const getProductUrl = `${endpoint}/listings/2021-08-01/items/${productData?.sellerId?productData?.sellerId:sellerId}/${productData.sku}?marketplaceIds=${productData?.marketplaceId?productData?.marketplaceId:marketplaceId}`;

//       const headers = {
//         "x-amz-access-token": accessToken,
//         "x-amz-date": moment.utc().toISOString(),
//         "Content-Type": "application/json",
//       };

//       // Create or Update Listing
//       const createResponse = await axios.put(createListingUrl, productData, {
//         headers,
//       });

//       // Get the Listing Details
//       const getResponse = await axios.get(getProductUrl, { headers });

//       res.json({
//         message: "Product created/updated successfully",
//         productDetails: getResponse.data,
//         createdProductDetails: createResponse?.data,
//       });
//     } catch (error) {
//       console.error(
//         "Error creating/updating product:",
//         error.response?.data || error.message
//       );
//       res
//         .status(500)
//         .json({
//           error: "Failed to create/update product",
//           details: error.response?.data,
//         });
//     }
//   }
// );

// // import axios from 'axios';
// // import { catchAsyncHandler } from '../middleware/catchAsyncError.js';
// // import { getAccessToken } from '../services/amazonService.js';

// // const endpoint = 'https://sellingpartnerapi-eu.amazon.com';
// // const marketplaceId = 'A21TJRUUN4KGV';

// export const fetchOrders = catchAsynHandler(async (req, res, next) => {
//   try {
//     const accessToken = await getAccessToken();

//     const requestParams = {
//       MarketplaceIds: req?.body?.marketplaceId?req?.body?.MarketplaceId:marketplaceId,
//       CreatedAfter: moment().subtract(60, "days").toISOString(),
//     };

//     const ordersUrl = `${endpoint}/orders/v0/orders?${querystring.stringify(
//       requestParams
//     )}`;

//     const headers = {
//       "x-amz-access-token": accessToken,
//     };

//     const ordersResponse = await axios.get(ordersUrl, { headers });

//     res.json({
//       message: "Orders fetched successfully",
//       orders: ordersResponse.data,
//     });
//   } catch (error) {
//     console.error(
//       "Error fetching orders:",
//       error.response?.data || error.message
//     );
//     res
//       .status(500)
//       .json({ error: "Failed to fetch orders", details: error.response?.data });
//   }
// });
// export const fetchListing = async (req, res) => {
//   console.log(req,"listing status request")
//     try {
//         const result = await getListingStatus(req);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// // export const fetchListing = catchAsynHandler(async (req, res, next) => {
// //   try {
// //     // Logic to fetch the listing status from amazonService
// //     const result = await getListingStatus();
// // console.log(result,"result")
// //     // const ordersResponse = await axios.get(ordersUrl, { headers });

// //     res.json({
// //       message: "Listing fetched successfully",
// //       orders: result.data,
// //     });
// //   } catch (error) {
// //     console.error(
// //       "Error fetching orders:",
// //       error.response?.data || error.message
// //     );
// //     res
// //       .status(500)
// //       .json({ error: "Failed to fetch orders", details: error.response?.data });
// //   }
// // });



// import axios from "axios";
// import moment from "moment";
// import querystring from "querystring";
// import { catchAsynHandler } from "../middleware/catchAsyncError.js";
// import { getAccessToken } from "../utils/amazonService.js";
// import { getListingStatus } from "../utils/amazonServiceToGetListing.js";
// import { calculateMetrics } from "../utils/metrics.js";

// const endpoint = "https://sellingpartnerapi-eu.amazon.com";

// export const createOrUpdateProduct = catchAsynHandler(async (req, res, next) => {
//     const productData = req.body;
//     const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.user; // Assuming credentials are stored in req.user after login

//     try {
//         const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

//         const createListingUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;
//         const getProductUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;

//         const headers = {
//             "x-amz-access-token": accessToken,
//             "x-amz-date": moment.utc().toISOString(),
//             "Content-Type": "application/json",
//         };

//         // Create or Update Listing
//         const createResponse = await axios.put(createListingUrl, productData, {
//             headers,
//         });

//         // Get the Listing Details
//         const getResponse = await axios.get(getProductUrl, { headers });

//         res.json({
//             message: "Product created/updated successfully",
//             productDetails: getResponse.data,
//             createdProductDetails: createResponse?.data,
//         });
//     } catch (error) {
//         console.error(
//             "Error creating/updating product:",
//             error.response?.data || error.message
//         );
//         res
//             .status(500)
//             .json({
//                 error: "Failed to create/update product",
//                 details: error.response?.data,
//             });
//     }
// });

// export const fetchOrders = catchAsynHandler(async (req, res, next) => {
//     const { refreshToken, clientId, clientSecret, marketplaceId } = req.body; // Assuming credentials are stored in req.user after login

//     try {
//         const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
// console.log(accessToken)
//         const requestParams = {
//             MarketplaceIds: marketplaceId,
//             CreatedAfter: moment().subtract(60, "days").toISOString(),
//         };

//         const ordersUrl = `${endpoint}/orders/v0/orders?${querystring.stringify(requestParams)}`;

//         const headers = {
//             "x-amz-access-token": accessToken,
//         };

//         const ordersResponse = await axios.get(ordersUrl, { headers });

//         res.json({
//             message: "Orders fetched successfully",
//             orders: ordersResponse.data,
//         });
//     } catch (error) {
//         console.error(
//             "Error fetching orders:",
//             error.response?.data || error.message
//         );
//         res
//             .status(500)
//             .json({ error: "Failed to fetch orders", details: error.response?.data });
//     }
// });

// // export const fetchDashboard = async (req, res) => {
// //     const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;
  
// //     try {
// //       const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
// //       const today = new Date();
// //       const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
// //       // Fetch orders for the last 30 days
// //       const ordersUrl = `${endpoint}/orders/v0/orders`;
// //       const ordersResponse = await axios.get(ordersUrl, {
// //         headers: {
// //           'x-amz-access-token': accessToken,
// //         },
// //         params: {
// //           MarketplaceIds: marketplaceId,
// //           CreatedAfter: thirtyDaysAgo.toISOString(),
// //           OrderStatuses: ['Shipped', 'Canceled'],
// //         },
// //       });
  
// //       // Fetch financial events for the last 30 days
// //       const financialEventsUrl = `${endpoint}/finances/v0/financialEvents`;
// //       const financialEventsResponse = await axios.get(financialEventsUrl, {
// //         headers: {
// //           'x-amz-access-token': accessToken,
// //         },
// //         params: {
// //           PostedAfter: thirtyDaysAgo.toISOString(),
// //         },
// //       });
  
// //       // Fetch inventory summary
// //       const inventoryUrl = `${endpoint}/fba/inventory/v1/summaries`;
// //       const inventorySummariesResponse = await axios.get(inventoryUrl, {
// //         headers: {
// //           'x-amz-access-token': accessToken,
// //         },
// //         params: {
// //           marketplaceIds: marketplaceId,
// //           granularityType: 'Marketplace',
// //           granularityId: marketplaceId,
// //         },
// //       });
  
// //       // Replace with your own metrics calculation function
// //       const metrics = calculateMetrics(
// //         ordersResponse.data.Orders,
// //         financialEventsResponse.data.FinancialEvents,
// //         inventorySummariesResponse.data.inventorySummaries
// //       );
  
// //       res.json(metrics);
// //     } catch (error) {
// //       console.error('Error fetching dashboard data:', error.response?.data || error.message);
// //       res.status(500).json({
// //         error: 'An error occurred while fetching dashboard data',
// //         details: error.response?.data,
// //       });
// //     }
// //   };
// // export const fetchListing = async (req, res) => {
// //   // console.log(req?.body,"req")
// //   const { refreshToken, clientId, clientSecret, marketplaceId,sellerId } = req.body; // Assuming credentials are stored in req.user after login

// //     console.log(req,"listing status request")
// //       try {
// //         // const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

// //           const result = await getListingStatus({ refreshToken, clientId, clientSecret, marketplaceId,sellerId });
// //           res.status(200).json(result);
// //       } catch (error) {
// //           res.status(500).json({ error: error.message });
// //       }
// //   };


// export const fetchListing = async (req, res) => {
//   const { refreshToken, clientId, clientSecret, marketplaceId, sellerId } = req.body;

//   // console.log(refreshToken, clientId, clientSecret, marketplaceId, sellerId, "payload from listing status");

//   try {
//     // Step 1: Fetch Access Token
//     const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
//     console.log(accessToken, "Access Token");

//     // Step 2: Prepare Headers
//     const headers = {
//       "x-amz-access-token": accessToken,
//       "content-type": "application/json",
//     };

//     // Step 3: Build URL
//     const url = `${endpoint}/listings/2021-08-01/items/${sellerId}?marketplaceIds=${marketplaceId}`;
//     // console.log(url, "Request URL");

//     // Step 4: Fetch Listing
//     const response = await axios.get(url, { headers });

//     // Step 5: Return Response
//     res.status(200).json(response?.data);
//   } catch (error) {
//     console.error("Error fetching listing status:", error.response?.data || error.message);
//     res.status(500).json({
//       error: "Failed to fetch listing status",
//       details: error.response?.data || error.message,
//     });
//   }
// };
















//   // export const fetchListing = catchAsynHandler(async (req, res, next) => {
//   //   try {
//   //     // Logic to fetch the listing status from amazonService
//   //     const result = await getListingStatus();
//   // console.log(result,"result")
//   //     // const ordersResponse = await axios.get(ordersUrl, { headers });
  
//   //     res.json({
//   //       message: "Listing fetched successfully",
//   //       orders: result.data,
//   //     });
//   //   } catch (error) {
//   //     console.error(
//   //       "Error fetching orders:",
//   //       error.response?.data || error.message
//   //     );
//   //     res
//   //       .status(500)
//   //       .json({ error: "Failed to fetch orders", details: error.response?.data });
//   //   }
//   // });


  




// import axios from "axios";
// import moment from "moment";
// import querystring from "querystring";
// import { catchAsynHandler } from "../middleware/catchAsyncError.js";
// import { getAccessToken } from "../utils/amazonService.js";
// import { calculateMetrics } from "../utils/metrics.js";

// const endpoint = "https://sellingpartnerapi-eu.amazon.com";

// export const createOrUpdateProduct = catchAsynHandler(async (req, res, next) => {
//     const productData = req.body;
//     const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.user;

//     try {
//         const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

//         const createListingUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;
//         const getProductUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;

//         const headers = {
//             "x-amz-access-token": accessToken,
//             "x-amz-date": moment.utc().toISOString(),
//             "Content-Type": "application/json",
//         };

//         const createResponse = await axios.put(createListingUrl, productData, { headers });
//         const getResponse = await axios.get(getProductUrl, { headers });

//         res.json({
//             message: "Product created/updated successfully",
//             productDetails: getResponse.data,
//             createdProductDetails: createResponse?.data,
//         });
//     } catch (error) {
//         console.error("Error creating/updating product:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to create/update product", details: error.response?.data });
//     }
// });

// export const fetchOrders = catchAsynHandler(async (req, res, next) => {
//     const { refreshToken, clientId, clientSecret, marketplaceId } = req.user;

//     try {
//         const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

//         const requestParams = {
//             MarketplaceIds: marketplaceId,
//             CreatedAfter: moment().subtract(60, "days").toISOString(),
//         };

//         const ordersUrl = `${endpoint}/orders/v0/orders?${querystring.stringify(requestParams)}`;

//         const headers = {
//             "x-amz-access-token": accessToken,
//         };

//         const ordersResponse = await axios.get(ordersUrl, { headers });

//         res.json({
//             message: "Orders fetched successfully",
//             orders: ordersResponse.data,
//         });
//     } catch (error) {
//         console.error("Error fetching orders:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to fetch orders", details: error.response?.data });
//     }
// });

// export const fetchListing = catchAsynHandler(async (req, res, next) => {
//     const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.user;

//     try {
//         const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

//         const headers = {
//             "x-amz-access-token": accessToken,
//             "content-type": "application/json",
//         };

//         const url = `${endpoint}/listings/2021-08-01/items/${sellerId}?marketplaceIds=${marketplaceId}`;
//         const response = await axios.get(url, { headers });

//         res.status(200).json(response?.data);
//     } catch (error) {
//         console.error("Error fetching listing status:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to fetch listing status", details: error.response?.data || error.message });
//     }
// });

// export const fetchDashboard = catchAsynHandler(async (req, res, next) => {
//     const { refreshToken, clientId, clientSecret, marketplaceId } = req.user;

//     try {
//         const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
//         const today = new Date();
//         const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

//         const ordersUrl = `${endpoint}/orders/v0/orders`;
//         const ordersResponse = await axios.get(ordersUrl, {
//             headers: { 'x-amz-access-token': accessToken },
//             params: { MarketplaceIds: marketplaceId, CreatedAfter: thirtyDaysAgo.toISOString(), OrderStatuses: ['Shipped', 'Canceled'] },
//         });

//         const financialEventsUrl = `${endpoint}/finances/v0/financialEvents`;
//         const financialEventsResponse = await axios.get(financialEventsUrl, {
//             headers: { 'x-amz-access-token': accessToken },
//             params: { PostedAfter: thirtyDaysAgo.toISOString() },
//         });

//         const inventoryUrl = `${endpoint}/fba/inventory/v1/summaries`;
//         const inventorySummariesResponse = await axios.get(inventoryUrl, {
//             headers: { 'x-amz-access-token': accessToken },
//             params: { marketplaceIds: marketplaceId, granularityType: 'Marketplace', granularityId: marketplaceId },
//         });

//         const metrics = calculateMetrics(ordersResponse.data.Orders, financialEventsResponse.data.FinancialEvents, inventorySummariesResponse.data.inventorySummaries);

//         res.json(metrics);
//     } catch (error) {
//         console.error('Error fetching dashboard data:', error.response?.data || error.message);
//         res.status(500).json({ error: 'An error occurred while fetching dashboard data', details: error.response?.data });
//     }
// });

// // Additional controllers for other routes can be added similarly

import axios from "axios";
import moment from "moment";
import querystring from "querystring";
import { catchAsynHandler } from "../middleware/catchAsyncError.js";
import { getAccessToken } from "../utils/amazonService.js";
import { calculateMetrics } from "../utils/metrics.js";

const endpoint = "https://sellingpartnerapi-eu.amazon.com";

// Helper function to create headers with access token
const createHeaders = (accessToken) => ({
  "x-amz-access-token": accessToken,
  "Content-Type": "application/json",
});

// 1. Create or Update Product
export const createOrUpdateProduct = catchAsynHandler(async (req, res, next) => {
  const productData = req.body;
  const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

    const createListingUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;
    const getProductUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;

    const headers = createHeaders(accessToken);

    const createResponse = await axios.put(createListingUrl, productData, { headers });
    const getResponse = await axios.get(getProductUrl, { headers });

    res.json({
      message: "Product created/updated successfully",
      productDetails: getResponse.data,
      createdProductDetails: createResponse?.data,
    });
  } catch (error) {
    console.error("Error creating/updating product:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create/update product", details: error.response?.data });
  }
});

// 2. Fetch Orders
export const fetchOrders = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

    const requestParams = {
      MarketplaceIds: marketplaceId,
      CreatedAfter: moment().subtract(60, "days").toISOString(),
    };

    const ordersUrl = `${endpoint}/orders/v0/orders?${querystring.stringify(requestParams)}`;
    const headers = createHeaders(accessToken);

    const ordersResponse = await axios.get(ordersUrl, { headers });

    res.json({
      message: "Orders fetched successfully",
      orders: ordersResponse.data,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch orders", details: error.response?.data });
  }
});

// 3. Fetch Listing
export const fetchListing = catchAsynHandler(async (req, res, next) => {
  const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/listings/2021-08-01/items/${sellerId}?marketplaceIds=${marketplaceId}`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching listing status:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch listing status", details: error.response?.data || error.message });
  }
});

// 4. Fetch Inventory Details
export const getInventoryDetails = catchAsynHandler(async (req, res, next) => {
  const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/fba/inventory/v1/summaries?marketplaceIds=${marketplaceId}`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching inventory details:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch inventory details", details: error.response?.data });
  }
});

// 5. Update Inventory
export const updateInventory = catchAsynHandler(async (req, res, next) => {
  const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.body;
  const inventoryData = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/fba/inventory/v1/summaries?marketplaceIds=${marketplaceId}`;
    const response = await axios.post(url, inventoryData, { headers });

    res.status(200).json({
      message: "Inventory updated successfully",
      data: response?.data,
    });
  } catch (error) {
    console.error("Error updating inventory:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to update inventory", details: error.response?.data });
  }
});

// 6. Fetch Order Details
export const getOrderDetails = catchAsynHandler(async (req, res, next) => {
  const { orderId, refreshToken, clientId, clientSecret } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/orders/v0/orders/${orderId}`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching order details:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch order details", details: error.response?.data });
  }
});

// 7. Fetch FBA Inventory
export const getFBAInventory = catchAsynHandler(async (req, res, next) => {
  const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/fba/inventory/v1/summaries?marketplaceIds=${marketplaceId}`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching FBA inventory:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch FBA inventory", details: error.response?.data });
  }
});

// 8. Create Shipping Labels
export const createShippingLabels = catchAsynHandler(async (req, res, next) => {
  const { orderId, refreshToken, clientId, clientSecret } = req.body;
  const shippingLabelData = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/shipping/v1/shipments/${orderId}/labels`;
    const response = await axios.post(url, shippingLabelData, { headers });

    res.status(200).json({
      message: "Shipping label created successfully",
      data: response?.data,
    });
  } catch (error) {
    console.error("Error creating shipping label:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create shipping label", details: error.response?.data });
  }
});

// 9. Process Return
export const processReturn = catchAsynHandler(async (req, res, next) => {
  const { returnId, refreshToken, clientId, clientSecret } = req.body;
  const returnData = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/returns/v1/returns/${returnId}/actions/process`;
    const response = await axios.post(url, returnData, { headers });

    res.status(200).json({
      message: "Return processed successfully",
      data: response?.data,
    });
  } catch (error) {
    console.error("Error processing return:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process return", details: error.response?.data });
  }
});

// 10. Fetch Dashboard Metrics
export const fetchDashboard = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const ordersUrl = `${endpoint}/orders/v0/orders`;
    const ordersResponse = await axios.get(ordersUrl, {
      headers: { 'x-amz-access-token': accessToken },
      params: { MarketplaceIds: marketplaceId, CreatedAfter: thirtyDaysAgo.toISOString(), OrderStatuses: ['Shipped', 'Canceled'] },
    });

    const financialEventsUrl = `${endpoint}/finances/v0/financialEvents`;
    const financialEventsResponse = await axios.get(financialEventsUrl, {
      headers: { 'x-amz-access-token': accessToken },
      params: { PostedAfter: thirtyDaysAgo.toISOString() },
    });

    const inventoryUrl = `${endpoint}/fba/inventory/v1/summaries`;
    const inventorySummariesResponse = await axios.get(inventoryUrl, {
      headers: { 'x-amz-access-token': accessToken },
      params: { marketplaceIds: marketplaceId, granularityType: 'Marketplace', granularityId: marketplaceId },
    });

    const metrics = calculateMetrics(ordersResponse.data.Orders, financialEventsResponse.data.FinancialEvents, inventorySummariesResponse.data.inventorySummaries);

    res.json(metrics);
  } catch (error) {
    console.error('Error fetching dashboard data:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while fetching dashboard data', details: error.response?.data });
  }
});

// 11. Update Order Status
export const updateOrderStatus = catchAsynHandler(async (req, res, next) => {
  const { orderId, refreshToken, clientId, clientSecret } = req.body;
  const orderStatusData = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/orders/v0/orders/${orderId}/status`;
    const response = await axios.post(url, orderStatusData, { headers });

    res.status(200).json({
      message: "Order status updated successfully",
      data: response?.data,
    });
  } catch (error) {
    console.error("Error updating order status:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to update order status", details: error.response?.data });
  }
});

// 12. Fetch Financial Events
export const getFinancialEvents = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/finances/v0/financialEvents`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching financial events:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch financial events", details: error.response?.data });
  }
});

// 13. Fetch Marketplace Participations
export const getMarketplaceParticipations = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/sellers/v1/marketplaceParticipations`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching marketplace participations:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch marketplace participations", details: error.response?.data });
  }
});

// 14. Fetch Reports
export const getReports = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/reports/v1/reports`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching reports:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch reports", details: error.response?.data });
  }
});

// 15. Submit Report
export const submitReport = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret } = req.body;
  const reportData = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/reports/v1/reports`;
    const response = await axios.post(url, reportData, { headers });

    res.status(200).json({
      message: "Report submitted successfully",
      data: response?.data,
    });
  } catch (error) {
    console.error("Error submitting report:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to submit report", details: error.response?.data });
  }
});

// 16. Fetch Report Document
export const getReportDocument = catchAsynHandler(async (req, res, next) => {
  const { reportId, refreshToken, clientId, clientSecret } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    const url = `${endpoint}/reports/v1/reports/${reportId}/document`;
    const response = await axios.get(url, { headers });

    res.status(200).json(response?.data);
  } catch (error) {
    console.error("Error fetching report document:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch report document", details: error.response?.data });
  }
});

// 17
export const fetchFinancialTransactions = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret, postedAfter, postedBefore } = req.body;

  try {
    // Step 1: Get Access Token
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

    // Step 2: Prepare Query Parameters
    const requestParams = {
      postedAfter: postedAfter || moment().subtract(30, "days").toISOString(), // Default: Last 30 days
      postedBefore: postedBefore || moment().toISOString(), // Default: Current date
    };

    // Step 3: Construct the Financial API URL
    const financialUrl = `${endpoint}/finances/2024-06-19/transactions?${querystring.stringify(requestParams)}`;
    const headers = createHeaders(accessToken);

    // Step 4: Fetch Financial Transactions
    const financialResponse = await axios.get(financialUrl, { headers });

    // Step 5: Return the Response
    res.json({
      message: "Financial transactions fetched successfully",
      transactions: financialResponse.data,
    });
  } catch (error) {
    console.error("Error fetching financial transactions:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch financial transactions",
      details: error.response?.data || error.message,
    });
  }
});

// 18. Analytics Endpoint
export const getOrderAnalytics = catchAsynHandler(async (req, res, next) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const headers = createHeaders(accessToken);

    // Fetch orders
    const requestParams = {
      MarketplaceIds: marketplaceId,
      CreatedAfter: moment().subtract(60, "days").toISOString(),
    };

    const ordersUrl = `${endpoint}/orders/v0/orders?${querystring.stringify(requestParams)}`;
    const ordersResponse = await axios.get(ordersUrl, { headers });
    console.log('Orders API Response:', JSON.stringify(ordersResponse.data, null, 2));

    // Handle nested payload structure
    const orders = ordersResponse.data?.payload?.Orders || [];
    console.log('Number of orders found:', orders.length);

    if (orders.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No orders found",
        rawResponse: ordersResponse.data
      });
    }

    // Calculate analytics
    const analytics = {
      totalOrders: orders.length,
      averageOrderValue: 0,
      totalOrderValue: 0,
      canceledOrders: 0,
      shippedOrders: 0,
      codOrders: 0,
      prepaidOrders: 0,
      ordersByStatus: {},
      ordersByPaymentMethod: {},
      dailyOrderTrends: {},
    };

    let validOrdersWithAmount = 0;

    orders.forEach(order => {
      console.log('Processing order:', order.AmazonOrderId);
      
      // Calculate order values
      if (order.OrderTotal && order.OrderTotal.Amount) {
        const amount = parseFloat(order.OrderTotal.Amount);
        console.log('Order amount:', amount);
        analytics.totalOrderValue += amount;
        validOrdersWithAmount++;
      }

      // Count by status
      analytics.ordersByStatus[order.OrderStatus] = (analytics.ordersByStatus[order.OrderStatus] || 0) + 1;
      
      // Count canceled vs shipped
      if (order.OrderStatus === 'Canceled') {
        analytics.canceledOrders++;
      } else if (order.OrderStatus === 'Shipped') {
        analytics.shippedOrders++;
      }

      // Count by payment method
      const paymentMethod = order.PaymentMethodDetails?.[0] || 'Unknown';
      analytics.ordersByPaymentMethod[paymentMethod] = (analytics.ordersByPaymentMethod[paymentMethod] || 0) + 1;

      // Count COD vs Prepaid
      if (paymentMethod.includes('CashOnDelivery') || paymentMethod === 'COD') {
        analytics.codOrders++;
      } else {
        analytics.prepaidOrders++;
      }

      // Daily order trends
      const orderDate = moment(order.PurchaseDate).format('YYYY-MM-DD');
      if (!analytics.dailyOrderTrends[orderDate]) {
        analytics.dailyOrderTrends[orderDate] = {
          count: 0,
          value: 0
        };
      }
      analytics.dailyOrderTrends[orderDate].count++;
      if (order.OrderTotal && order.OrderTotal.Amount) {
        analytics.dailyOrderTrends[orderDate].value += parseFloat(order.OrderTotal.Amount);
      }
    });

    // Calculate average order value
    analytics.averageOrderValue = validOrdersWithAmount > 0 
      ? (analytics.totalOrderValue / validOrdersWithAmount).toFixed(2)
      : 0;

    console.log('Final analytics:', JSON.stringify(analytics, null, 2));

    // Convert daily trends to array and sort by date
    analytics.dailyOrderTrends = Object.entries(analytics.dailyOrderTrends)
      .map(([date, data]) => ({
        date,
        ...data,
        averageValue: data.count > 0 ? (data.value / data.count).toFixed(2) : "0"
      }))
      .sort((a, b) => moment(a.date).diff(moment(b.date)));

    res.json({
      success: true,
      analytics: {
        ...analytics,
        currency: orders[0]?.OrderTotal?.CurrencyCode || 'INR',
        totalOrdersProcessed: orders.length,
        ordersWithValidAmount: validOrdersWithAmount
      }
    });

  } catch (error) {
    console.error("Error calculating analytics:", error);
    console.error("Error details:", error.response?.data);
    res.status(500).json({
      error: "Failed to calculate analytics",
      details: error.response?.data || error.message,
      stack: error.stack
    });
  }
});