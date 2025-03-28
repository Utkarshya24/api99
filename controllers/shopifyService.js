import axios from 'axios';
import querystring from 'querystring';
import {User} from '../models/userModels.js'; // Import your User model

const SHOPIFY_API_BASE_URL = 'https://{shop}.myshopify.com';
const SHOPIFY_AUTH_URL = 'https://{shop}.myshopify.com/admin/oauth/authorize';
const SHOPIFY_TOKEN_URL = 'https://{shop}.myshopify.com/admin/oauth/access_token';

// Function to generate the Shopify authorization URL
export function getShopifyAuthUrl(shop, clientId, redirectUri, scopes) {
    const queryParams = querystring.stringify({
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri,
        state: 'a3f1b2c4e5d67890123456789abcdef', // Add a nonce for security
        grant_options: [], // Optional: Use 'per-user' for per-user tokens
    });
    return `${SHOPIFY_AUTH_URL.replace('{shop}', shop)}?${queryParams}`;
}

// Function to exchange the authorization code for an access token
export async function getShopifyAccessToken(shop, clientId, clientSecret, code) {
    try {
        const response = await axios.post(
            SHOPIFY_TOKEN_URL.replace('{shop}', shop),
            querystring.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Shopify access token:', error.response?.data || error.message);
        throw new Error('Failed to fetch Shopify access token');
    }
}

// Function to store Shopify token and shop domain in the database
export async function storeShopifyToken(userId, shopDomain, accessToken) {
    try {
        const user = await User.findOneAndUpdate(
            { userId },
            { shopify: { accessToken, shopDomain } },
            { new: true, upsert: true }
        );
        return user;
    } catch (error) {
        console.error('Error storing Shopify token:', error.message);
        throw new Error('Failed to store Shopify token');
    }
}

// Function to fetch Shopify products
export async function fetchShopifyProducts(shop, accessToken) {
    try {
        const response = await axios.get(
            `${SHOPIFY_API_BASE_URL.replace('{shop}', shop)}/admin/api/2023-10/products.json`,
            { headers: { 'X-Shopify-Access-Token': accessToken } }
        );
        return response.data.products;
    } catch (error) {
        console.error('Error fetching Shopify products:', error.response?.data || error.message);
        throw new Error('Failed to fetch Shopify products');
    }
}