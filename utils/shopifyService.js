import axios from 'axios';
import querystring from 'querystring';

export async function getShopifyAccessToken(authorizationCode, shopUrl) {
  try {
    const params = querystring.stringify({
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code: authorizationCode,
    });

    const response = await axios.post(`https://${shopUrl}/admin/oauth/access_token`, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return {
      accessToken: response.data.access_token,
    };
  } catch (error) {
    console.error('Error fetching Shopify access token:', error.response?.data || error.message);
    throw new Error('Failed to fetch Shopify access token');
  }
}