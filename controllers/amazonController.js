
import axios from "axios";
import moment from "moment";
import querystring from "querystring";
import { catchAsynHandler } from "../middleware/catchAsyncError.js";
import { getAccessToken } from "../utils/amazonService.js";
import { getListingStatus } from "../utils/amazonServiceToGetListing.js";
import { calculateMetrics } from "../utils/metrics.js";

const endpoint = "https://sellingpartnerapi-eu.amazon.com";

export const createOrUpdateProduct = catchAsynHandler(async (req, res, next) => {
    const productData = req.body;
    const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.user;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const createListingUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;
        const getProductUrl = `${endpoint}/listings/2021-08-01/items/${sellerId}/${productData.sku}?marketplaceIds=${marketplaceId}`;

        const headers = {
            "x-amz-access-token": accessToken,
            "x-amz-date": moment.utc().toISOString(),
            "Content-Type": "application/json",
        };

        const createResponse = await axios.put(createListingUrl, productData, { headers });
        const getResponse = await axios.get(getProductUrl, { headers });

        res.json({
            message: "Product created/updated successfully",
            productDetails: getResponse.data,
            createdProductDetails: createResponse?.data,
        });
    } catch (error) {
        console.error("Error creating/updating product:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to create/update product",
            details: error.response?.data,
        });
    }
});

export const getInventoryDetails = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, marketplaceId, skuList } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const inventoryUrl = `${endpoint}/inventory/v1/inventoryDetails`;
        const response = await axios.get(inventoryUrl, {
            headers,
            params: {
                marketplaceIds: marketplaceId,
                sellerSkus: skuList,
            },
        });

        res.json({
            message: "Inventory details fetched successfully",
            inventory: response.data,
        });
    } catch (error) {
        console.error("Error fetching inventory:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to fetch inventory details",
            details: error.response?.data,
        });
    }
});

export const updateInventory = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, marketplaceId, inventoryUpdates } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const updateUrl = `${endpoint}/inventory/v1/inventoryUpdate`;
        const response = await axios.post(updateUrl, {
            marketplaceIds: [marketplaceId],
            updates: inventoryUpdates,
        }, { headers });

        res.json({
            message: "Inventory updated successfully",
            result: response.data,
        });
    } catch (error) {
        console.error("Error updating inventory:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to update inventory",
            details: error.response?.data,
        });
    }
});

export const getOrderDetails = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, marketplaceId, orderId } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const orderUrl = `${endpoint}/orders/v0/orders/${orderId}`;
        const response = await axios.get(orderUrl, { headers });

        res.json({
            message: "Order details fetched successfully",
            order: response.data,
        });
    } catch (error) {
        console.error("Error fetching order details:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to fetch order details",
            details: error.response?.data,
        });
    }
});

export const updateOrderStatus = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, orderId, status } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const updateUrl = `${endpoint}/orders/v0/orders/${orderId}/orderStatus`;
        const response = await axios.patch(updateUrl, {
            status,
        }, { headers });

        res.json({
            message: "Order status updated successfully",
            result: response.data,
        });
    } catch (error) {
        console.error("Error updating order status:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to update order status",
            details: error.response?.data,
        });
    }
});

export const getFBAInventory = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const fbaUrl = `${endpoint}/fba/inventory/v1/summaries`;
        const response = await axios.get(fbaUrl, {
            headers,
            params: {
                marketplaceIds: [marketplaceId],
                granularityType: "Marketplace",
                granularityId: marketplaceId,
            },
        });

        res.json({
            message: "FBA inventory fetched successfully",
            inventory: response.data,
        });
    } catch (error) {
        console.error("Error fetching FBA inventory:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to fetch FBA inventory",
            details: error.response?.data,
        });
    }
});

export const createShippingLabels = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, shipmentData } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const labelUrl = `${endpoint}/shipping/v1/shipments/labels`;
        const response = await axios.post(labelUrl, shipmentData, { headers });

        res.json({
            message: "Shipping labels created successfully",
            labels: response.data,
        });
    } catch (error) {
        console.error("Error creating shipping labels:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to create shipping labels",
            details: error.response?.data,
        });
    }
});

export const processReturn = catchAsynHandler(async (req, res, next) => {
    const { refreshToken, clientId, clientSecret, returnData } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "Content-Type": "application/json",
        };

        const returnUrl = `${endpoint}/returns/v1/returns`;
        const response = await axios.post(returnUrl, returnData, { headers });

        res.json({
            message: "Return processed successfully",
            result: response.data,
        });
    } catch (error) {
        console.error("Error processing return:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to process return",
            details: error.response?.data,
        });
    }
});

export const fetchDashboard = catchAsynHandler(async (req, res) => {
    const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;
  
    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
        const ordersUrl = `${endpoint}/orders/v0/orders`;
        const ordersResponse = await axios.get(ordersUrl, {
            headers: {
                "x-amz-access-token": accessToken,
            },
            params: {
                MarketplaceIds: marketplaceId,
                CreatedAfter: thirtyDaysAgo.toISOString(),
                OrderStatuses: ["Shipped", "Canceled"],
            },
        });
  
        const financialEventsUrl = `${endpoint}/finances/v0/financialEvents`;
        const financialEventsResponse = await axios.get(financialEventsUrl, {
            headers: {
                "x-amz-access-token": accessToken,
            },
            params: {
                PostedAfter: thirtyDaysAgo.toISOString(),
            },
        });
  
        const inventoryUrl = `${endpoint}/fba/inventory/v1/summaries`;
        const inventorySummariesResponse = await axios.get(inventoryUrl, {
            headers: {
                "x-amz-access-token": accessToken,
            },
            params: {
                marketplaceIds: marketplaceId,
                granularityType: "Marketplace",
                granularityId: marketplaceId,
            },
        });
  
        const metrics = calculateMetrics(
            ordersResponse.data.Orders,
            financialEventsResponse.data.FinancialEvents,
            inventorySummariesResponse.data.inventorySummaries
        );
  
        res.json(metrics);
    } catch (error) {
        console.error("Error fetching dashboard data:", error.response?.data || error.message);
        res.status(500).json({
            error: "An error occurred while fetching dashboard data",
            details: error.response?.data,
        });
    }
});

export const fetchListing = catchAsynHandler(async (req, res) => {
    const { refreshToken, clientId, clientSecret, marketplaceId, sellerId } = req.body;

    try {
        const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

        const headers = {
            "x-amz-access-token": accessToken,
            "content-type": "application/json",
        };

        const url = `${endpoint}/listings/2021-08-01/items/${sellerId}?marketplaceIds=${marketplaceId}`;
        const response = await axios.get(url, { headers });

        res.status(200).json(response?.data);
    } catch (error) {
        console.error("Error fetching listing status:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to fetch listing status",
            details: error.response?.data || error.message,
        });
    }
});
