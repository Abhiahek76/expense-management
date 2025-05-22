import express from "express";
const router = express.Router();
import {
  createFullTransaction,
  getTransactions,
  updateFullTransaction,
  deleteFullTransaction,
  filterTransactions,
  getTransactionById,
} from "../controllers/transaction.controller.js";

import authMiddleware from "../middleware/auth.js";

// Create a new transaction
router.post("/transactions/full", authMiddleware, createFullTransaction);

// Get transactions (with filtering, pagination)
router.get("/transactions", authMiddleware, getTransactions);

// Update a transaction by ID
router.put("/transactions/:id", authMiddleware, updateFullTransaction);

// Delete a transaction by ID
router.delete("/transactions/:id", authMiddleware, deleteFullTransaction);
//get id
router.get("/transactions/:id", authMiddleware, getTransactionById);
//filter
router.get("/filter", authMiddleware, filterTransactions);

export default router;
