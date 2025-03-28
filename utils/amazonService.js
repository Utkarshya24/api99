// import axios from 'axios';
// import querystring from 'querystring';

// export async function getAccessToken() {
//     try {
//         const tokenResponse = await axios.post('https://api.amazon.com/auth/o2/token', querystring.stringify({
//             grant_type: 'refresh_token',
//             refresh_token: process.env.REFRESH_TOKEN,
//             client_id: process.env.CLIENT_ID,
//             client_secret: process.env.CLIENT_SECRET,
//         }));
//         return tokenResponse.data.access_token;
//     } catch (error) {
//         console.error('Error fetching access token:', error.response?.data || error.message);
//         throw new Error('Failed to fetch access token');
//     }
// }


import axios from 'axios';
import querystring from 'querystring';

export async function getAccessToken({ refreshToken, clientId, clientSecret }) {
    console.log(refreshToken,"token")
    try {
        const tokenResponse = await axios.post(
            'https://api.amazon.com/auth/o2/token',
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
            })
        );
        return tokenResponse.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        throw new Error('Failed to fetch access token');
    }
}
