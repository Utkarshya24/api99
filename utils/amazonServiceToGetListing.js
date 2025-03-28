import axios from "axios";
// import credentials from "../config/credentials";
// const credentials = require('./config/credentials');
const credentials = {
  refreshToken: process.env.REFRESH_TOKEN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  sellerId: process.env.SELLER_ID,
  marketplaceId: process.env.MARKETPLACE_ID,
};
const endpoint = "https://sellingpartnerapi-eu.amazon.com";

async function getAccessToken() {
  try {
    const response = await axios.post("https://api.amazon.com/auth/o2/token", {
      grant_type: "refresh_token",
      refresh_token: process.env.REFRESH_TOKEN,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.response.data);
    throw error;
  }
}

async function createOrUpdateListing(productData) {
  const accessToken = await getAccessToken();
  
  const headers = {
    "x-amz-access-token": accessToken,
    "content-type": "application/json",
  };

  try {
    const url = `${endpoint}/listings/2021-08-01/items/${credentials.sellerId}/${productData.sku}?marketplaceIds=${credentials.marketplaceId}`;
    const response = await axios.put(url, productData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating/updating product:", error.response.data);
    throw error;
  }
}

export async function getListingStatus({ refreshToken, clientId, clientSecret, marketplaceId,sellerId }) {
  console.log(refreshToken, clientId, clientSecret, marketplaceId,sellerId,"payload from listing status")
  // const accessToken = await getAccessToken();
  const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

  const headers = {
    "x-amz-access-token": accessToken,
    "content-type": "application/json",
  };

  try {
    console.log(endpoint, "endpoint");
    const sellerId = process.env.SELLER_ID;
    const marketplaceId = process.env.MARKETPLACE_ID;
    const url = `${endpoint}/listings/2021-08-01/items/${sellerId}?marketplaceIds=${marketplaceId}`;
    const response = await axios.get(url, { headers });
    
    return response?.data;
  } catch (error) {
    console.error("Error fetching listing status:", error.response.data);
    throw error;
  }
}
