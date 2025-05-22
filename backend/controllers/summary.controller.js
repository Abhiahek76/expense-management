import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userid", userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    // 1. Totals (income, expense)
    const totals = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $toUpper: "$type" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    totals.forEach((item) => {
      if (item._id === "INCOME") totalIncome = item.total;
      else if (item._id === "EXPENSE") totalExpense = item.total;
    });

    const balance = totalIncome - totalExpense;

    // 2. Monthly Breakdown
    const monthlySummary = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          month: { $month: "$date" },
          year: { $year: "$date" },
          type: { $toUpper: "$type" }, // Ensure type is upper case
          amount: 1, // Only select relevant fields
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            year: "$year",
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const formattedMonthly = {};

    monthlySummary.forEach(({ _id, total }) => {
      const key = `${_id.month}-${_id.year}`;
      if (!formattedMonthly[key]) {
        formattedMonthly[key] = {
          month: _id.month,
          year: _id.year,
          income: 0,
          expense: 0,
        };
      }

      if (_id.type === "INCOME") formattedMonthly[key].income = total;
      else if (_id.type === "EXPENSE") formattedMonthly[key].expense = total;
    });

    res.json({
      totalIncome,
      totalExpense,
      balance,
      monthlyBreakdown: Object.values(formattedMonthly),
    });
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
