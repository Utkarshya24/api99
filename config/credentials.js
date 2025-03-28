
require('dotenv').config();

module.exports = {
  refreshToken: process.env.REFRESH_TOKEN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  sellerId: process.env.SELLER_ID,
  marketplaceId: process.env.MARKETPLACE_ID
};
