// routes/summaryRoutes.js
import express from "express";
import { getDashboardSummary } from "../controllers/summary.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard-summary", authMiddleware, getDashboardSummary);

export default router;
