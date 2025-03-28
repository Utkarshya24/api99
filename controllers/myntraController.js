// // import { Request, Response } from 'express';
// // import { User } from "../models/userModels";
// import { getMyntraAccessToken } from "../utils/myntraAuth";
// import axios from "axios";
// // import { User } from "../models/User";

// const MYNTRA_API_BASE = "https://api.pretr.com/partner/"; // Replace with actual Myntra API base URL
// // const MYNTRA_API_BASE = 'https://api.myntra.com'; // Replace with actual Myntra API base URL

// // export const createOrUpdateProduct =catchAsynHandler(async (req, res,next) => {
// //     try {
// //         const userId = req.user.id; // Assuming user ID is available in the request
// //         const user = await User.findById(userId);
// //         if (!user || !user.myntra) {
// //             return res.status(400).json({ message: 'Myntra credentials not found' });
// //         }

// //         const { merchant_id, secret_key } = user.myntra;
// //         const accessToken = await getMyntraAccessToken(merchant_id, secret_key);

// //         const productData = req.body;
// //         const response = await axios.post(`${MYNTRA_API_BASE}/v4/products`, productData, {
// //             headers: {
// //                 'Authorization': `Bearer ${accessToken}`,
// //                 'Content-Type': 'application/json'
// //             }
// //         });

// //         res.json(response.data);
// //     } catch (error) {
// //         console.error('Error creating/updating product on Myntra:', error);
// //         res.status(500).json({ message: 'Error creating/updating product on Myntra' });
// //     }
// // });

// // export const fetchOrders = catchAsynHandler(async (req, res,next) => {
// //     try {
// //         const userId = req.user.id;
// //         const user = await User.findById(userId);
// //         if (!user || !user.myntra) {
// //             return res.status(400).json({ message: 'Myntra credentials not found' });
// //         }

// //         const { merchant_id, secret_key } = user.myntra;
// //         const accessToken = await getMyntraAccessToken(merchant_id, secret_key);

// //         const response = await axios.get(`${MYNTRA_API_BASE}/v4/orders`, {
// //             headers: {
// //                 'Authorization': `Bearer ${accessToken}`
// //             }
// //         });

// //         res.json(response.data);
// //     } catch (error) {
// //         console.error('Error fetching orders from Myntra:', error);
// //         res.status(500).json({ message: 'Error fetching orders from Myntra' });
// //     }
// // });

// // export const fetchInventory = catchAsynHandler(async (req, res,next)  => {
// //     try {
// //         const userId = req.user.id;
// //         const user = await User.findById(userId);
// //         if (!user || !user.myntra) {
// //             return res.status(400).json({ message: 'Myntra credentials not found' });
// //         }

// //         const { merchant_id, secret_key } = user.myntra;
// //         const accessToken = await getMyntraAccessToken(merchant_id, secret_key);

// //         const response = await axios.get(`${MYNTRA_API_BASE}/v4/inventory`, {
// //             headers: {
// //                 'Authorization': `Bearer ${accessToken}`
// //             }
// //         });

// //         res.json(response.data);
// //     } catch (error) {
// //         console.error('Error fetching inventory from Myntra:', error);
// //         res.status(500).json({ message: 'Error fetching inventory from Myntra' });
// //     }
// // });


import axios from 'axios';
// import { catchAsyncHandler } from '../middleware/catchAsyncError.js';
import { getMyntraAccessToken } from '../utils/myntraService.js';
import { catchAsynHandler } from "../middleware/catchAsyncError.js";

const MYNTRA_API_ENDPOINT = 'https://api.pretr.com/partner/'; // Replace with actual Myntra API endpoint
// const MYNTRA_API_ENDPOINT = 'https://api.myntra.com'; // Replace with actual Myntra API endpoint

export const createOrUpdateProduct = catchAsynHandler(async (req, res, next) => {
    const productData = req.body;
    const { myntraToken } = req.user; // Assuming Myntra credentials are stored in req.user after login

    try {
        const accessToken = await getMyntraAccessToken(myntraToken);

        const createProductUrl = `${MYNTRA_API_ENDPOINT}/catalog/v1/products`;
        
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const createResponse = await axios.post(createProductUrl, productData, { headers });

        res.json({
            message: 'Product created/updated successfully',
            productDetails: createResponse.data,
        });
    } catch (error) {
        console.error('Error creating/updating product:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create/update product', details: error.response?.data });
    }
});

export const fetchOrders = catchAsynHandler(async (req, res, next) => {
    const { myntraToken } = req.user;

    try {
        const accessToken = await getMyntraAccessToken(myntraToken);

        const ordersUrl = `${MYNTRA_API_ENDPOINT}/orders/v1/list`;
        
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };

        const ordersResponse = await axios.get(ordersUrl, { headers });

        res.json({
            message: 'Orders fetched successfully',
            orders: ordersResponse.data,
        });
    } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch orders', details: error.response?.data });
    }
});

export const fetchListing = catchAsynHandler(async (req, res, next) => {
    const { myntraToken } = req.user;

    try {
        const accessToken = await getMyntraAccessToken(myntraToken);

        const listingUrl = `${MYNTRA_API_ENDPOINT}/catalog/v1/products`;
        
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };

        const listingResponse = await axios.get(listingUrl, { headers });

        res.json({
            message: 'Listings fetched successfully',
            listings: listingResponse.data,
        });
    } catch (error) {
        console.error('Error fetching listings:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch listings', details: error.response?.data });
    }
});

export const fetchInventory = catchAsynHandler(async (req, res, next) => {
    const { myntraToken } = req.user;

    try {
        const accessToken = await getMyntraAccessToken(myntraToken);

        const inventoryUrl = `${MYNTRA_API_ENDPOINT}/inventory/v1/summary`;
        
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };

        const inventoryResponse = await axios.get(inventoryUrl, { headers });

        res.json({
            message: 'Inventory fetched successfully',
            inventory: inventoryResponse.data,
        });
    } catch (error) {
        console.error('Error fetching inventory:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch inventory', details: error.response?.data });
    }
});


