import axios from "axios";
import { catchAsynHandler } from "../middleware/catchAsyncError.js";

const OAUTH_BASE_URL = "https://api.amazon.com/auth/o2";
const MARKETPLACE_API_BASE = "https://sellingpartnerapi-eu.amazon.com";

export const linkAmazonAccount = catchAsynHandler(async (req, res, next) => {
  const { clientId, clientSecret, code } = req.body;

  try {
    const tokenData = await axios.post(
      `${OAUTH_BASE_URL}/token`,
      {
        grant_type: "authorization_code",
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: "https://3000-unibazar-frontendreact-ehpdpajnk7e.ws-us118.gitpod.io/auth/callback",
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.status(200).json({
      success: true,
      message: "Amazon account link ho gaya!",
      data: tokenData.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.response?.data || error.message,
    });
  }
});

export const getAmazonOrders = catchAsynHandler(async (req, res, next) => {
  const { clientId, clientSecret, refreshToken } = req.body;

  try {
    const accessToken = await axios.post(
      `${OAUTH_BASE_URL}/token`,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    ).then(res => res.data.access_token);

    const ordersResponse = await axios.get(`${MARKETPLACE_API_BASE}/orders/v0/orders`, {
      params: { MarketplaceIds: "ATVPDKIKX0DER", CreatedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      headers: { "x-amz-access-token": accessToken, "Content-Type": "application/json" },
    });

    res.status(200).json({
      success: true,
      message: "Orders mil gaye!",
      data: ordersResponse.data.payload.Orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.response?.data || error.message,
    });
  }
});