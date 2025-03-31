import express from "express";
import { linkAmazonAccount, getAmazonOrders } from "../controllers/amazonSPAuth.js";

const router = express.Router();

router.post("/link-amazon", linkAmazonAccount); 
router.post("/amazon-orders", getAmazonOrders);

export default router