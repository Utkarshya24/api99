// import axios from 'axios';

// const url = "https://api.flipkart.net/oauth-service/oauth/token";

// // Replace with your client ID and secret
// const clientId = "4550a67b03b6698378421141826920304488";
// // const clientId = "141586882b21616605565b5876583204b8177";
// const clientSecret = "38dfa126e56810846db203f47049c666";

// // Encode client ID and secret in Base64
// const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

// // Query parameters
// const queryParams = {
//   grant_type: "client_credentials",
//   scope: "Seller_Api",
// };

// // Headers
// const headers = {
//   Authorization: authHeader,
// };

// // Make the request
// async function getAccessToken() {
//   try {
//     const response = await axios.get(url, {
//       headers,
//       params: queryParams,
//     });

//     const accessToken = response.data.access_token;
//     console.log("Your access token is: " + accessToken);
//   } catch (error) {
//     console.error("Error fetching access token:", error.response?.data || error.message);
//   }
// }

// // Call the function
// getAccessToken();


// import axios from 'axios';

// const url = "https://api.flipkart.net/oauth-service/oauth/token";

// const clientId = "4550a67b03b6698378421141826920304488";
// const clientSecret = "38dfa126e56810846db203f47049c666";
// const authorizationCode = "hsgnTm";

// const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

// const headers = {
//   Authorization: authHeader,
// };

// const body = {
//   grant_type: "authorization_code",
//   code: authorizationCode,
// };

// async function getAccessToken() {
//   try {
//     const response = await axios.post(url, body, { headers });
//     console.log("Access token:", response.data.access_token);
//   } catch (error) {
//     console.error("Error fetching access token:", error.response?.data || error.message);
//   }
// }

// getAccessToken();

import axios from 'axios';
import qs from 'querystring';

// Replace these with your actual Flipkart Partner App ID and App Secret
const APP_ID = '4550a67b03b6698378421141826920304488';
const APP_SECRET = '38dfa126e56810846db203f47049c666';

// The URL for the token endpoint
const TOKEN_URL = 'https://api.flipkart.net/oauth-service/oauth/token';

// The parameters for the token request
const params = {
    redirect_uri: 'https://www.unibazar.in/',
    grant_type: 'authorization_code',
    state: 'c799bc4ad961a910b706b7ed119c29cc',
    code: 'qwgSAj'
};

// Encode the App ID and App Secret for Basic Auth
const auth = Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64');

// Make the POST request to get the token
axios.post(TOKEN_URL, qs.stringify(params), {
    headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => {
    console.log('Token Response:', response.data);
})
.catch(error => {
    console.error('Error fetching token:', error.response ? error.response.data : error.message);
});