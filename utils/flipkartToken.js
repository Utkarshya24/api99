import axios from 'axios';
import { User } from '../models/userModels.js'; // Import your User model

export async function getFlipkartAccessToken(req, resp) {
    const { code, userId } = req.body; // Get code and userId from the request body
    

    const url = 'https://api.flipkart.net/oauth-service/oauth/token';

    const params = {
        redirect_uri: 'https://www.unibazar.in/',
        grant_type: 'authorization_code',
        state: 'c799bc4ad961a910b706b7ed119c29cc',
        code: code,
    };

    const auth = {
        username: '4550a67b03b6698378421141826920304488', // Client ID
        password: '38dfa126e56810846db203f47049c666', // Client Secret
    };

    try {
        const tokenResponse = await axios.get(url, {
            params,
            auth,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log("Success Response:", tokenResponse.data);

        // Convert expires_in to a readable expiration date
        const expiresInSeconds = tokenResponse.data.expires_in;
        const expirationDate = new Date(Date.now() + expiresInSeconds * 1000);

        // Update the user document with the Flipkart token details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'flipkart.accessToken': tokenResponse.data.access_token,
                    'flipkart.refreshToken': tokenResponse.data.refresh_token,
                    'flipkart.tokenExpiration': expirationDate,
                    'flipkart.scope': tokenResponse.data.scope,
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return resp.status(404).json({
                success: false,
                error: { message: "User not found!" },
            });
        }

        // Send success response to the client
        resp.status(200).json({
            success: true,
            data: tokenResponse.data,
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);

        // Handle specific error cases
        if (error.response && error.response.status === 400) {
            // Send error response to the client
            resp.status(400).json({
                success: false,
                error: error.response.data, // Return the error response from Flipkart
            });
        } else {
            // Handle other errors (e.g., network errors)
            resp.status(500).json({
                success: false,
                error: { message: error.message },
            });
        }
    }
}