import axios from 'axios';

const MYNTRA_AUTH_URL = 'https://api.myntra.com/auth/v1/token'; // Replace with actual Myntra auth endpoint

export async function getMyntraAccessToken(merchant_id, secret_key) {
    try {
        const response = await axios.post(MYNTRA_AUTH_URL, {
            merchant_id,
            secret_key
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Myntra access token:', error.response?.data || error.message);
        throw new Error('Failed to fetch Myntra access token');
    }
}