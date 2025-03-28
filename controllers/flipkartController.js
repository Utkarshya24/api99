

// import axios from "axios";
// // import { catchAsynHandler } from "../middleware/catchAsyncError";
// // import { errorHandler } from "../utils/error";
// import { catchAsynHandler } from "../middleware/catchAsyncError.js";

// const FLIPKART_API_BASE = "https://api.flipkart.net/sellers";
// const MARKETPLACE_API_BASE = "https://api.flipkart.net/sellers";

// export const generateFlipkartToken = async (appId, appSecret) => {
//   try {
//     const auth = Buffer.from(`${appId}:${appSecret}`).toString("base64");
//     const response = await axios.post(
//       `${FLIPKART_API_BASE}/auth/token`,
//       "grant_type=client_credentials&scope=Seller_Api",
//       {
//         headers: {
//           Authorization: `Basic ${auth}`,
//           "Content-Type": "application/x-www-form-urlencoded"
//         }
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.log(error)
//     // throw new errorHandler("Failed to generate Flipkart token: " + error.message, 500);
//   }
// };

// export const linkFlipkartAccount = catchAsynHandler(async (req, res, next) => {
//   const { appId, appSecret } = req.body;

//   try {
//     const token = await generateFlipkartToken(appId, appSecret);
    
//     // req.user.platforms.push({
//     //   name: "flipkart",
//     //   credentials: {
//     //     appId,
//     //     appSecret,
//     //     token
//     //   },
//     //   isActive: true
//     // });

//     // await req.user.save();
// console.log(token,"token")
//     res.status(200).json({
//       success: true,
//       message: "Flipkart account linked successfully",
//       token:token,
//     });
//   } catch (error) {
//     console.log(error)
//     // return next(new errorHandler("Failed to link Flipkart account: " + error.message, 500));
//   }
// });

// import axios from "axios";
// // import { catchAsynHandler } from "../middleware/catchAsyncError";
// // import { errorHandler } from "../utils/error";
// import { catchAsynHandler } from "../middleware/catchAsyncError.js";

// // Base URLs for Flipkart APIs
// const FLIPKART_API_BASE = "https://api.flipkart.net/oauth-service/oauth";
// // https://api.flipkart.net/oauth-service/oauth/token?redirect_uri=https://www.unibazar.in/&grant_type=authorization_code&state=c799bc4ad961a910b706b7ed119c29cc&code=00xRG3
// // Function to exchange authorization code for access token
// export const getAccessTokenFromAuthorizationCode = async (appId, appSecret, authorizationCode, redirectUri, state) => {
//   try {
//     // const auth = Buffer.from(`${appId}:${appSecret}`).toString("base64");
    
//     // Create the request body
//     const body = new URLSearchParams({
//       grant_type: 'authorization_code',
//       code: authorizationCode,
//       redirect_uri: redirectUri,
//       state: state
//     });

//     // Make the POST request to exchange authorization code for access token
//     const response = await axios.post(`${FLIPKART_API_BASE}/token`, body.toString(), {
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     });

//     // Return the token data (access_token, refresh_token, etc.)
//     return response.data;
//   } catch (error) {
//     console.error(error.response ? error.response.data : error.message);
//     throw new Error("Failed to get access token from authorization code.");
//   }
// };

// // Controller to handle link Flipkart account
// export const linkFlipkartAccount = catchAsynHandler(async (req, res, next) => {
//   const { appId, appSecret, authorizationCode } = req.body;
//   const redirectUri = "https://www.unibazar.in/";  // Define your redirect URI
//   const state = "c799bc4ad961a910b706b7ed119c29cc";  // Define your state value

//   try {
//     // Exchange authorization code for access token
//     const tokenData = await getAccessTokenFromAuthorizationCode(appId, appSecret, authorizationCode, redirectUri, state);
    
//     console.log(tokenData, "Token Data");

//     // You can save the token data in your database if needed

//     res.status(200).json({
//       success: true,
//       message: "Flipkart account linked successfully",
//       tokenData: tokenData,  // Send back the token data
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to link Flipkart account: " + error.message,
//     });
//   }
// });



// import axios from "axios";
// import { catchAsynHandler } from "../middleware/catchAsyncError.js";

// // Base URL for Flipkart API
// const FLIPKART_API_BASE = "https://api.flipkart.net/oauth-service/oauth";

// // Function to get a new access token using a refresh token
// export const getAccessTokenFromRefreshToken = async (appId, appSecret, refreshToken) => {
//   try {
//     // Encode appId and appSecret in Base64
//     const auth = Buffer.from(`${appId}:${appSecret}`).toString("base64");

//     // Create the request body
//     const body = new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token: refreshToken
//     });

//     // Make the POST request to exchange refresh token for access token
//     const response = await axios.post(`${FLIPKART_API_BASE}/token`, body.toString(), {
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     });

//     // Return the token data (access_token, refresh_token, etc.)
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching access token:", error.response ? error.response.data : error.message);
//     throw new Error("Failed to get access token from refresh token.");
//   }
// };

// // Controller to handle linking Flipkart account
// export const linkFlipkartAccount = catchAsynHandler(async (req, res, next) => {
//   const { appId, appSecret, refreshToken } = req.body;

//   try {
//     // Fetch access token using the refresh token
//     const tokenData = await getAccessTokenFromRefreshToken(appId, appSecret, refreshToken);

//     console.log(tokenData, "Token Data");

//     // Save the token data in your database if needed

//     res.status(200).json({
//       success: true,
//       message: "Flipkart account linked successfully",
//       tokenData: tokenData, // Send back the token data
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to link Flipkart account: " + error.message,
//     });
//   }
// });

import axios from "axios";
import { catchAsynHandler } from "../middleware/catchAsyncError.js";

// Base URL for Flipkart API
const OAUTH_BASE_URL = "https://api.flipkart.net/oauth-service/oauth";
const MARKETPLACE_API_BASE = "https://api.flipkart.net/sellers";

// Function to get access token from authorization code
export const getAccessTokenFromCode = async (appId, appSecret, code) => {
  try {
    const url = `${OAUTH_BASE_URL}/token?`;

    const params = {
      redirect_uri: "https://www.unibazar.in/",
      grant_type: "authorization_code",
      state: "c799bc4ad961a910b706b7ed119c29cc",
      code: code
    };

    const config = {
      auth: {
        username: appId,
        password: appSecret
      },
      params: params,
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await axios.post(url, null, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(`Failed to get access token: ${errorMessage}`);
  }
};

// Controller to handle linking Flipkart account
export const linkFlipkartAccount = catchAsynHandler(async (req, res, next) => {
  const { appId, appSecret, code } = req.body;

  try {
    // Fetch access token using authorization code
    const tokenData = await getAccessTokenFromCode(appId, appSecret, code);

    res.status(200).json({
      success: true,
      message: "Flipkart account linked successfully",
      data: tokenData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.response?.data || error.message
    });
  }
});

export async function getProductDetails(req, res) {
  const { accessToken, skuId } = req.body;

  const url = `https://api.flipkart.net/sellers/v3/listings/${skuId}`;

  try {
      const response = await axios.get(url, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
          },
      });

      res.status(200).json({
          success: true,
          data: response.data,
      });
  } catch (error) {
      console.error('Error fetching product details:', error.response?.data || error.message);
      res.status(500).json({
          success: false,
          error: error.response?.data || { message: 'Failed to fetch product details' },
      });
  }
}

//working fine
export async function searchListings(req, res) {
    const { accessToken, status, pageId } = req.body;

    // Validate required fields
    if (!accessToken || !status) {
        return res.status(400).json({
            success: false,
            error: 'accessToken and status are required',
        });
    }

    // Construct the payload
    const payload = {
        filters: {
            listing_status: status.toUpperCase(), // Ensure status is in uppercase
        },
        page_id: pageId || null, // Use null if pageId is not provided
    };

    const url = 'https://api.flipkart.net/sellers/listings/v3/search';

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Return the response from Flipkart API
        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error searching listings:', error.response?.data || error.message);

        // Return the error response
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to search listings' },
        });
    }
}


export async function getOrders(req, res) {
  const { accessToken } = req.body;

  const url = 'https://api.flipkart.net/sellers/v3/orders';

  try {
      const response = await axios.get(url, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
          },
      });

      res.status(200).json({
          success: true,
          data: response.data,
      });
  } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      res.status(500).json({
          success: false,
          error: error.response?.data || { message: 'Failed to fetch orders' },
      });
  }
}
export const getFlipkartOrders = catchAsynHandler(async (req, res, next) => {
  const platform = req.user.platforms.find(p => p.name === "flipkart");
  if (!platform) {
    console.log(error)
    // return next(new errorHandler("Flipkart account not linked", 400));
  }

  try {
    const token = await generateFlipkartToken(
      platform.credentials.appId,
      platform.credentials.appSecret
    );

    const response = await axios.get(`${MARKETPLACE_API_BASE}/orders/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        filter: req.query.status || "all",
        orderDate: {
          from: req.query.fromDate,
          to: req.query.toDate
        },
        offset: req.query.offset || 0,
        limit: req.query.limit || 50
      }
    });

    res.status(200).json({
      success: true,
      orders: response.data.orderItems
    });
  } catch (error) {
    console.log(error)
    // return next(new errorHandler("Failed to fetch Flipkart orders: " + error.message, 500));
  }
});

export const getFlipkartProducts = catchAsynHandler(async (req, res, next) => {
  const platform = req.user.platforms.find(p => p.name === "flipkart");
  if (!platform) {
    console.log(error)
    // return next(new errorHandler("Flipkart account not linked", 400));
  }

  try {
    const token = await generateFlipkartToken(
      platform.credentials.appId,
      platform.credentials.appSecret
    );

    const response = await axios.get(`${MARKETPLACE_API_BASE}/inventory/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        status: req.query.status || "ACTIVE",
        offset: req.query.offset || 0,
        limit: req.query.limit || 50
      }
    });

    res.status(200).json({
      success: true,
      products: response.data.skuItems
    });
  } catch (error) {
    console.log(error)
    // return next(new errorHandler("Failed to fetch Flipkart products: " + error.message, 500));
  }
});

export const createFlipkartProduct = catchAsynHandler(async (req, res, next) => {
  const platform = req.user.platforms.find(p => p.name === "flipkart");
  if (!platform) {
    console.log(error)
    // return next(new errorHandler("Flipkart account not linked", 400));
  }

  try {
    const token = await generateFlipkartToken(
      platform.credentials.appId,
      platform.credentials.appSecret
    );

    const response = await axios.post(
      `${MARKETPLACE_API_BASE}/listings`,
      {
        skus: [{
          productId: req.body.productId,
          skuId: req.body.skuId,
          price: req.body.price,
          tax: req.body.tax,
          listingStatus: "ACTIVE",
          fulfillmentProfile: req.body.fulfillmentProfile,
          packages: req.body.packages,
          locationId: req.body.locationId
        }]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(201).json({
      success: true,
      listing: response.data.skuItems[0]
    });
  } catch (error) {
    console.log(error)
    // return next(new errorHandler("Failed to create Flipkart product: " + error.message, 500));
  }
});

export const updateFlipkartInventory = catchAsynHandler(async (req, res, next) => {
  const platform = req.user.platforms.find(p => p.name === "flipkart");
  if (!platform) {
    console.log(error)
    // return next(new errorHandler("Flipkart account not linked", 400));
  }

  try {
    const token = await generateFlipkartToken(
      platform.credentials.appId,
      platform.credentials.appSecret
    );

    const response = await axios.post(
      `${MARKETPLACE_API_BASE}/inventory/update`,
      {
        skus: [{
          skuId: req.body.skuId,
          quantity: req.body.quantity,
          locationId: req.body.locationId
        }]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      result: response.data.skuItems[0]
    });
  } catch (error) {
    console.log(error)
    // return next(new errorHandler("Failed to update Flipkart inventory: " + error.message, 500));
  }
});
