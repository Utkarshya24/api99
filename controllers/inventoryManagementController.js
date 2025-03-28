import { makeApiRequest } from '../utils/amazonApi.js';
import { getAccessToken } from '../utils/amazonService.js';
// import { getAccessToken } from '../utils/auth.js';

export const fetchOrdersForInventory = async (req, res) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const ordersData = await makeApiRequest('/orders/v0/orders', {
      MarketplaceIds: marketplaceId,
      CreatedAfter: thirtyDaysAgo.toISOString(),
      OrderStatuses: ['Shipped', 'Canceled'],
    }, accessToken);

    res.json(ordersData);
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    res.status(500).json({
      error: 'An error occurred while fetching orders',
      details: error.response?.data,
    });
  }
};

export const fetchFinancialEvents = async (req, res) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const financialEventsData = await makeApiRequest('/finances/v0/financialEvents', {
      PostedAfter: thirtyDaysAgo.toISOString(),
    }, accessToken);

    res.json(financialEventsData);
  } catch (error) {
    console.error('Error fetching financial events:', error.response?.data || error.message);
    res.status(500).json({
      error: 'An error occurred while fetching financial events',
      details: error.response?.data,
    });
  }
};

export const fetchInventorySummaries = async (req, res) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });

    const inventorySummariesData = await makeApiRequest('/fba/inventory/v1/summaries', {
      marketplaceIds: marketplaceId,
      granularityType: 'Marketplace',
      granularityId: marketplaceId,
    }, accessToken);

    res.json(inventorySummariesData);
  } catch (error) {
    console.error('Error fetching inventory summaries:', error.response?.data || error.message);
    res.status(500).json({
      error: 'An error occurred while fetching inventory summaries',
      details: error.response?.data,
    });
  }
};

export const fetchDashboardForInventory = async (req, res) => {
  const { refreshToken, clientId, clientSecret, marketplaceId } = req.body;

  try {
    const accessToken = await getAccessToken({ refreshToken, clientId, clientSecret });
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [ordersData, financialEventsData, inventorySummariesData] = await Promise.all([
      makeApiRequest('/orders/v0/orders', {
        MarketplaceIds: marketplaceId,
        CreatedAfter: thirtyDaysAgo.toISOString(),
        OrderStatuses: ['Shipped', 'Canceled'],
      }, accessToken),
      makeApiRequest('/finances/v0/financialEvents', {
        PostedAfter: thirtyDaysAgo.toISOString(),
      }, accessToken),
      makeApiRequest('/fba/inventory/v1/summaries', {
        marketplaceIds: marketplaceId,
        granularityType: 'Marketplace',
        granularityId: marketplaceId,
      }, accessToken),
    ]);

    const metrics = calculateMetrics(
      ordersData.Orders,
      financialEventsData.FinancialEvents,
      inventorySummariesData.inventorySummaries
    );

    res.json(metrics);
  } catch (error) {
    console.error('Error fetching dashboard data:', error.response?.data || error.message);
    res.status(500).json({
      error: 'An error occurred while fetching dashboard data',
      details: error.response?.data,
    });
  }
};

