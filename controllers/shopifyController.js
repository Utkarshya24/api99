// import axios from 'axios';
// import { getShopifyAccessToken } from '../utils/shopifyService.js';
// import { catchAsynHandler } from '../middleware/catchAsyncError.js';
// import { User } from '../models/userModels.js';



// // Redirect seller to Shopify's OAuth page
// export const initiateShopifyAuth = async (req, res) => {
//   try {
//     const { shop, userId } = req.query; // Seller's Shopify store URL and user ID
//     if (!shop || !userId) {
//       return res.status(400).json({ error: 'Shop URL and user ID are required' });
//     }

//     const SHOPIFY_AUTH_URL = `https://${shop}/admin/oauth/authorize`;
//     const clientId = process.env.SHOPIFY_CLIENT_ID;
//     const redirectUri = process.env.SHOPIFY_REDIRECT_URI;
//     const scopes = process.env.SHOPIFY_SCOPES;

//     // Build the authorization URL
//     const authUrl = `${SHOPIFY_AUTH_URL}?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${userId}`;

//     // Redirect the seller to Shopify's OAuth page
//     res.status(200).json({ authUrl });
//   } catch (error) {
//     console.error('Error initiating Shopify auth:', error.message);
//     res.status(500).json({ error: 'Failed to initiate Shopify auth', details: error.message });
//   }
// };

// // Exchange authorization code for access token
// export const completeShopifyAuth = async (req, res) => {
//   try {
//     const { authorizationCode, shop, userId } = req.body;
//     if (!authorizationCode || !shop || !userId) {
//       return res.status(400).json({ error: 'Authorization code, shop URL, and user ID are required' });
//     }

//     const SHOPIFY_TOKEN_URL = `https://${shop}/admin/oauth/access_token`;
//     const clientId = process.env.SHOPIFY_CLIENT_ID;
//     const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

//     // Exchange authorization code for access token
//     const response = await axios.post(SHOPIFY_TOKEN_URL, {
//       client_id: clientId,
//       client_secret: clientSecret,
//       code: authorizationCode,
//     });

//     const { access_token } = response.data;

//     // Find the user by ID and save Shopify credentials
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.shopifyCredentials = { shopUrl: shop, accessToken: access_token };
//     await user.save();

//     res.status(200).json({ message: 'Shopify account linked successfully' });
//   } catch (error) {
//     console.error('Error completing Shopify auth:', error.message);
//     res.status(500).json({ error: 'Failed to complete Shopify auth', details: error.message });
//   }
// };

// // Link Shopify Account
// export const linkShopifyAccount = catchAsynHandler(async (req, res, next) => {
//   const { authorizationCode, shopUrl } = req.body;

//   try {
//     // Exchange authorization code for access token
//     const { accessToken } = await getShopifyAccessToken(authorizationCode, shopUrl);

//     // Save tokens in the database
//     req.user.shopifyCredentials = { shopUrl, accessToken };
//     await req.user.save();

//     res.status(200).json({ message: 'Shopify account linked successfully' });
//   } catch (error) {
//     console.error('Error linking Shopify account:', error.message);
//     res.status(500).json({ error: 'Failed to link Shopify account', details: error.message });
//   }
// });

// // Fetch Shopify Products
// export const fetchShopifyProducts = catchAsynHandler(async (req, res, next) => {
//   const { shopUrl, accessToken } = req.user.shopifyCredentials;

//   try {
//     const response = await axios.get(`https://${shopUrl}/admin/api/2023-10/products.json`, {
//       headers: { 'X-Shopify-Access-Token': accessToken },
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error fetching Shopify products:', error.message);
//     res.status(500).json({ error: 'Failed to fetch Shopify products', details: error.message });
//   }
// });

// // Fetch Shopify Inventory
// export const fetchShopifyInventory = catchAsynHandler(async (req, res, next) => {
//   const { shopUrl, accessToken } = req.user.shopifyCredentials;

//   try {
//     const response = await axios.get(`https://${shopUrl}/admin/api/2023-10/inventory_levels.json`, {
//       headers: { 'X-Shopify-Access-Token': accessToken },
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error fetching Shopify inventory:', error.message);
//     res.status(500).json({ error: 'Failed to fetch Shopify inventory', details: error.message });
//   }
// });

// // Fetch Shopify Orders
// export const fetchShopifyOrders = catchAsynHandler(async (req, res, next) => {
//   const { shopUrl, accessToken } = req.user.shopifyCredentials;

//   try {
//     const response = await axios.get(`https://${shopUrl}/admin/api/2023-10/orders.json`, {
//       headers: { 'X-Shopify-Access-Token': accessToken },
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error fetching Shopify orders:', error.message);
//     res.status(500).json({ error: 'Failed to fetch Shopify orders', details: error.message });
//   }
// });

// // Update Shopify Inventory
// export const updateShopifyInventory = catchAsynHandler(async (req, res, next) => {
//   const { shopUrl, accessToken } = req.user.shopifyCredentials;
//   const { inventoryItemId, locationId, available } = req.body;

//   try {
//     const response = await axios.post(
//       `https://${shopUrl}/admin/api/2023-10/inventory_levels/set.json`,
//       { inventory_item_id: inventoryItemId, location_id: locationId, available },
//       {
//         headers: { 'X-Shopify-Access-Token': accessToken },
//       }
//     );

//     res.status(200).json({
//       message: 'Shopify inventory updated successfully',
//       data: response.data,
//     });
//   } catch (error) {
//     console.error('Error updating Shopify inventory:', error.message);
//     res.status(500).json({ error: 'Failed to update Shopify inventory', details: error.message });
//   }
// });



import axios from 'axios';
import dotenv from 'dotenv';
import {User} from '../models/userModels.js';

dotenv.config();

// Redirect seller to Shopify's OAuth page
export const initiateShopifyAuth = async (req, res) => {
  try {
    const { shop, userId } = req.query; // Seller's Shopify store URL and user ID
    if (!shop || !userId) {
      return res.status(400).json({ error: 'Shop URL and user ID are required' });
    }

    const SHOPIFY_AUTH_URL = `https://${shop}/admin/oauth/authorize`;
    const clientId = "b08f26e1fce35ca8f6930b01360b8055" ;
    const redirectUri = "https://unibazar.in/auth/shopify/callback";
    const scopes = "read_products,write_products,read_inventory,write_inventory,read_orders,write_orders";
    // const clientId = process.env.SHOPIFY_CLIENT_ID|| ;
    // const redirectUri = process.env.SHOPIFY_REDIRECT_URI;
    // const scopes = process.env.SHOPIFY_SCOPES;

    // Build the authorization URL
    const authUrl = `${SHOPIFY_AUTH_URL}?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${userId}`;

    // Redirect the seller to Shopify's OAuth page
    res.status(200).json({ authUrl });
  } catch (error) {
    console.error('Error initiating Shopify auth:', error.message);
    res.status(500).json({ error: 'Failed to initiate Shopify auth', details: error.message });
  }
};

// Exchange authorization code for access token
export const completeShopifyAuth = async (req, res) => {
  try {
    const { authorizationCode, shop, userId } = req.body;
    if (!authorizationCode || !shop || !userId) {
      return res.status(400).json({ error: 'Authorization code, shop URL, and user ID are required' });
    }

    const SHOPIFY_TOKEN_URL = `https://${shop}/admin/oauth/access_token`;
    const clientId = "b08f26e1fce35ca8f6930b01360b8055";
    const clientSecret ="8c19427dc18e08cffb77e81adc84cae4";

    // Exchange authorization code for access token
    const response = await axios.post(SHOPIFY_TOKEN_URL, {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
    });

    const { access_token } = response.data;

    // Find the user by ID and save Shopify credentials
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.shopifyCredentials = { shopUrl: shop, accessToken: access_token };
    await user.save();

    res.status(200).json({ message: 'Shopify account linked successfully' });
  } catch (error) {
    console.error('Error completing Shopify auth:', error.message);
    res.status(500).json({ error: 'Failed to complete Shopify auth', details: error.message });
  }
};

// Fetch Shopify Products
export const fetchShopifyProducts = async (req, res) => {
  try {
    const { shopUrl, accessToken } = req.user.shopifyCredentials;
    const response = await axios.get(`https://${shopUrl}/admin/api/2023-10/products.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Shopify products:', error.message);
    res.status(500).json({ error: 'Failed to fetch Shopify products', details: error.message });
  }
};

// Fetch Shopify Inventory
export const fetchShopifyInventory = async (req, res) => {
  try {
    const { shopUrl, accessToken } = req.user.shopifyCredentials;
    const response = await axios.get(`https://${shopUrl}/admin/api/2023-10/inventory_levels.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Shopify inventory:', error.message);
    res.status(500).json({ error: 'Failed to fetch Shopify inventory', details: error.message });
  }
};

// Fetch Shopify Orders
export const fetchShopifyOrders = async (req, res) => {
  try {
    const { shopUrl, accessToken } = req.user.shopifyCredentials;
    const response = await axios.get(`https://${shopUrl}/admin/api/2023-10/orders.json`, {
      headers: { 'X-Shopify-Access-Token': accessToken },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Shopify orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch Shopify orders', details: error.message });
  }
};

// Update Shopify Inventory
export const updateShopifyInventory = async (req, res) => {
  try {
    const { shopUrl, accessToken } = req.user.shopifyCredentials;
    const { inventoryItemId, locationId, available } = req.body;

    const response = await axios.post(
      `https://${shopUrl}/admin/api/2023-10/inventory_levels/set.json`,
      { inventory_item_id: inventoryItemId, location_id: locationId, available },
      {
        headers: { 'X-Shopify-Access-Token': accessToken },
      }
    );

    res.status(200).json({
      message: 'Shopify inventory updated successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Error updating Shopify inventory:', error.message);
    res.status(500).json({ error: 'Failed to update Shopify inventory', details: error.message });
  }
};

// import axios from 'axios';
// import dotenv from 'dotenv';
// import { shopify } from '../config/shopify.config.js'; // Import Shopify API configuration
// import {User} from '../models/userModels.js'; // Assuming you have a User model

// dotenv.config();

// // Redirect seller to Shopify's OAuth page
// export const initiateShopifyAuth = async (req, res) => {
//   try {
//     const { shop, userId } = req.query; // Seller's Shopify store URL and user ID
//     if (!shop || !userId) {
//       return res.status(400).json({ error: 'Shop URL and user ID are required' });
//     }

//     // Use Shopify API to generate the OAuth URL
//     const authUrl = await shopify.auth.begin({
//       shop,
//       callbackUrl: process.env.SHOPIFY_REDIRECT_URI,
//       isOnline: false, // Use offline tokens for long-term access
//       rawSession: userId, // Pass the user ID as part of the session
//     });

//     res.status(200).json({ authUrl });
//   } catch (error) {
//     console.error('Error initiating Shopify auth:', error.message);
//     res.status(500).json({ error: 'Failed to initiate Shopify auth', details: error.message });
//   }
// };

// // Exchange authorization code for access token
// export const completeShopifyAuth = async (req, res) => {
//   try {
//     const { shop, code, state } = req.body; // Extract query parameters
//     const userId = state; // The user ID passed as the state parameter

//     if (!shop || !code || !userId) {
//       return res.status(400).json({ error: 'Shop URL, authorization code, and user ID are required' });
//     }

//     // Use Shopify API to exchange the authorization code for an access token
//     const session = await shopify.auth.callback({
//       rawRequest: req,
//       rawResponse: res,
//     });

//     const { accessToken } = session;

//     // Save Shopify credentials for the user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.shopifyCredentials = { shopUrl: shop, accessToken };
//     await user.save();

//     res.status(200).json({ message: 'Shopify account linked successfully' });
//   } catch (error) {
//     console.error('Error completing Shopify auth:', error.message);
//     res.status(500).json({ error: 'Failed to complete Shopify auth', details: error.message });
//   }
// };

// // Fetch Shopify Products
// export const fetchShopifyProducts = async (req, res) => {
//   try {
//     const { shopUrl, accessToken } = req.user.shopifyCredentials;
//     const client = new shopify.clients.Rest({ session: { shop: shopUrl, accessToken } });

//     const response = await client.get({
//       path: 'products',
//     });

//     res.status(200).json(response.body);
//   } catch (error) {
//     console.error('Error fetching Shopify products:', error.message);
//     res.status(500).json({ error: 'Failed to fetch Shopify products', details: error.message });
//   }
// };

// // Fetch Shopify Inventory
// export const fetchShopifyInventory = async (req, res) => {
//   try {
//     const { shopUrl, accessToken } = req.user.shopifyCredentials;
//     const client = new shopify.clients.Rest({ session: { shop: shopUrl, accessToken } });

//     const response = await client.get({
//       path: 'inventory_levels',
//     });

//     res.status(200).json(response.body);
//   } catch (error) {
//     console.error('Error fetching Shopify inventory:', error.message);
//     res.status(500).json({ error: 'Failed to fetch Shopify inventory', details: error.message });
//   }
// };

// // Fetch Shopify Orders
// export const fetchShopifyOrders = async (req, res) => {
//   try {
//     const { shopUrl, accessToken } = req.user.shopifyCredentials;
//     const client = new shopify.clients.Rest({ session: { shop: shopUrl, accessToken } });

//     const response = await client.get({
//       path: 'orders',
//     });

//     res.status(200).json(response.body);
//   } catch (error) {
//     console.error('Error fetching Shopify orders:', error.message);
//     res.status(500).json({ error: 'Failed to fetch Shopify orders', details: error.message });
//   }
// };

// // Update Shopify Inventory
// export const updateShopifyInventory = async (req, res) => {
//   try {
//     const { shopUrl, accessToken } = req.user.shopifyCredentials;
//     const { inventoryItemId, locationId, available } = req.body;

//     const client = new shopify.clients.Rest({ session: { shop: shopUrl, accessToken } });

//     const response = await client.post({
//       path: 'inventory_levels/set',
//       data: {
//         inventory_item_id: inventoryItemId,
//         location_id: locationId,
//         available,
//       },
//     });

//     res.status(200).json({
//       message: 'Shopify inventory updated successfully',
//       data: response.body,
//     });
//   } catch (error) {
//     console.error('Error updating Shopify inventory:', error.message);
//     res.status(500).json({ error: 'Failed to update Shopify inventory', details: error.message });
//   }
// };