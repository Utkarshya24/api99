export const injectUserCredentials = (req, res, next) => {
    const { sellerId, refreshToken, clientId, clientSecret, marketplaceId } = req.body; // Ensure these are provided in your login response
    if (!sellerId || !refreshToken || !clientId || !clientSecret) {
        return res.status(400).json({ error: "Missing required credentials" });
    }

    req.user = {
        sellerId,
        refreshToken,
        clientId,
        clientSecret,
        marketplaceId: marketplaceId || "A21TJRUUN4KGV", // Fallback marketplaceId
    };
    next();
};
