import express from 'express';
import {
    getShopifyAuthUrl,
    getShopifyAccessToken,
    storeShopifyToken,
    fetchShopifyProducts,
} from '../controllers/shopifyService.js';
import { User } from '../models/userModels.js';
import dotenv from 'dotenv';

dotenv.config();
const shopifyRoute = express.Router();

// Route to initiate Shopify OAuth flow
shopifyRoute.post('/auth', (req, res) => {
    const { shop, userId } = req.body; // Shop URL and user ID from the request body
    if (!shop || !userId) {
        return res.status(400).json({ error: 'Shop and userId parameters are required' });
    }

    const clientId = process.env.SHOPIFY_CLIENT_ID; // Your Shopify App's API Key
    const redirectUri = process.env.SHOPIFY_REDIRECT_URI; // Your app's redirect URI
    const scopes = 'read_products,read_orders'; // Required scopes

    const authUrl = getShopifyAuthUrl(shop, clientId, redirectUri, scopes);
    res.json({ authUrl, userId });
});

// Route to handle Shopify OAuth callback
shopifyRoute.get('/auth/callback', async (req, res) => {
    const { code, shop } = req.query;
    const { userId } = req.query; // Pass userId as a query parameter

    if (!code || !shop || !userId) {
        return res.status(400).json({ error: 'Code, shop, and userId parameters are required' });
    }

    try {
        const clientId = process.env.SHOPIFY_CLIENT_ID;
        const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
        const accessToken = await getShopifyAccessToken(shop, clientId, clientSecret, code);

        // Store the access token and shop domain in the database
        await storeShopifyToken(userId, shop, accessToken);

        res.json({ message: 'Shopify account linked successfully', accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch Shopify products
shopifyRoute.get('/products', async (req, res) => {
    const { userId } = req.query; // Retrieve userId from the query

    try {
        // Fetch the user from the database
        const user = await User.findOne({ userId });
        if (!user || !user.shopify || !user.shopify.accessToken) {
            return res.status(400).json({ error: 'Shopify account not linked' });
        }

        const { shopDomain, accessToken } = user.shopify;
        const products = await fetchShopifyProducts(shopDomain, accessToken);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default shopifyRoute;