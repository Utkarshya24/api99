import express from 'express';
import { fetchDashboardForInventory, fetchFinancialEvents, fetchInventorySummaries, fetchOrdersForInventory } from '../controllers/inventoryManagementController.js';
// import { fetchOrders, fetchFinancialEvents, fetchInventorySummaries, fetchDashboard } from '../controllers/amazonController.js';

const router = express.Router();

router.post('/orders', fetchOrdersForInventory);
router.post('/financial-events', fetchFinancialEvents);
router.post('/inventory-summaries', fetchInventorySummaries);
router.post('/dashboard', fetchDashboardForInventory);

export default router;

