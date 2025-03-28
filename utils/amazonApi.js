import axios from 'axios';
// import { getAccessToken } from './auth.js'; // Assume this function exists to get the access token

// const endpoint = 'https://sellingpartnerapi-na.amazon.com'; // Adjust for your region if necessary
const endpoint = "https://sellingpartnerapi-eu.amazon.com";

export async function makeApiRequest(path, params, accessToken) {
  const url = `${endpoint}${path}`;
  const response = await axios.get(url, {
    headers: {
      'x-amz-access-token': accessToken,
    },
    params: params,
    paramsSerializer: params => {
      return Object.entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');
    }
  });
  return response.data;
}

