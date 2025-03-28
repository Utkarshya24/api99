import axios from "axios"


export async function getDashboardAnalytics(req, res) {
    const { accessToken } = req.body;
  
    try {
      // Fetch total orders
      const totalOrdersResponse = await axios.get('https://api.flipkart.net/orders/v2/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
  
      const totalOrders = totalOrdersResponse.data.length;
  
      // Fetch today's listed products
      const todayListingsResponse = await axios.get('https://api.flipkart.net/sellers/listings/v3', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
  
      const todayListings = todayListingsResponse.data.filter(
        (listing) => new Date(listing.createdAt).toDateString() === new Date().toDateString()
      ).length;
  
      // Fetch today's orders (shipped, canceled, delivered)
      const todayOrdersResponse = await axios.get('https://api.flipkart.net/orders/v2/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
  
      const todayOrders = todayOrdersResponse.data.filter(
        (order) => new Date(order.orderDate).toDateString() === new Date().toDateString()
      );
  
      const shippedOrders = todayOrders.filter((order) => order.status === 'SHIPPED').length;
      const canceledOrders = todayOrders.filter((order) => order.status === 'CANCELED').length;
      const deliveredOrders = todayOrders.filter((order) => order.status === 'DELIVERED').length;
  
      // Return analytics data
      res.status(200).json({
        success: true,
        data: {
          totalOrders,
          todayListings,
          todayOrders: todayOrders.length,
          shippedOrders,
          canceledOrders,
          deliveredOrders,
        },
      });
    } catch (error) {
      console.error('Error fetching dashboard analytics:', error.response?.data || error.message);
      res.status(500).json({
        success: false,
        error: error.response?.data || { message: 'Failed to fetch dashboard analytics' },
      });
    }
  }
export async function createListings(req, res) {
    const { accessToken, listings } = req.body;
    console.log(accessToken,"access")
    console.log(listings,"listings")
    const url = 'https://api.flipkart.net/sellers/listings/v3';

    try {
        const response = await axios.post(url, listings, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error creating listings:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to create listings' },
        });
    }
}
export async function updateListings(req, res) {
    const { accessToken, listings } = req.body;

    const url = 'https://api.flipkart.net/sellers/listings/v3/update';

    try {
        const response = await axios.post(url, listings, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error updating listings:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to update listings' },
        });
    }
}

export async function fetchListings(req, res) {
    const { accessToken, skuIds } = req.body;

    const url = `https://api.flipkart.net/sellers/listings/v3/${skuIds}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error fetching listings:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to fetch listings' },
        });
    }
}

export async function updateListingPrices(req, res) {
    const { accessToken, priceUpdates } = req.body;

    const url = 'https://api.flipkart.net/sellers/listings/v3/update/price';

    try {
        const response = await axios.post(url, priceUpdates, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error updating listing prices:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to update listing prices' },
        });
    }
}

export async function updateListingInventory(req, res) {
    const { accessToken, inventoryUpdates } = req.body;

    const url = 'https://api.flipkart.net/sellers/listings/v3/update/inventory';

    try {
        const response = await axios.post(url, inventoryUpdates, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error updating listing inventory:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to update listing inventory' },
        });
    }
}
export async function searchListings(req, res) {
    const { accessToken, filters, pageId } = req.body;

    const url = 'https://api.flipkart.net/sellers/listings/v3/search';

    const payload = {
        filters,
        page_id: pageId || null,
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error('Error searching listings:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || { message: 'Failed to search listings' },
        });
    }
}


