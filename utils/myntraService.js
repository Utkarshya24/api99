import axios from 'axios';

// const MYNTRA_AUTH_ENDPOINT = 'https://auth.myntra.com/oauth/token'; // Replace with actual Myntra auth endpoint
const MYNTRA_AUTH_ENDPOINT = 'https://api.pretr.com/authorization/generate_token'; // Replace with actual Myntra auth endpoint

export async function getMyntraAccessToken(myntraToken) {
    try {
        const tokenResponse = await axios.post(MYNTRA_AUTH_ENDPOINT, {
            grant_type: 'client_credentials',
            client_id: myntraToken.clientId,
            client_secret: myntraToken.clientSecret,
        });
        return tokenResponse.data.access_token;
    } catch (error) {
        console.error('Error fetching Myntra access token:', error.response?.data || error.message);
        throw new Error('Failed to fetch Myntra access token');
    }
}

