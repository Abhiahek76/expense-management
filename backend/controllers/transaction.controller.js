// controllers/TransactionController.js
import Transaction from "../models/Transaction.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";
import PaymentMethod from "../models/PaymentMethod.js";

export const createFullTransaction = async (req, res) => {
  try {
    const {
      amount,
      type,
      categoryName,
      subcategoryName,
      paymentMethodName,
      date,
      description,
    } = req.body;

    const userId = req.user; // From auth middleware

    // 1. Create Category
    const newCategory = new Category({ name: categoryName });
    await newCategory.save();

    // 2. Create Subcategory
    const newSubcategory = new Subcategory({
      name: subcategoryName,
      category: newCategory._id,
    });
    await newSubcategory.save();

    // 3. Create Payment Method
    const newPaymentMethod = new PaymentMethod({
      name: paymentMethodName,
    });
    await newPaymentMethod.save();

    // 4. Create Transaction
    const newTransaction = new Transaction({
      userId,
      amount,
      type,
      category: newCategory._id,
      subcategory: newSubcategory._id,
      paymentMethod: newPaymentMethod._id,
      date,
      description,
    });
    await newTransaction.save();

    res.status(201).json({
      message:
        "Transaction created with new category, subcategory, and payment method",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error in full transaction creation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get route
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ userId })
      .populate("category")
      .populate("subcategory")
      .populate("paymentMethod");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//updet route
export const updateFullTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      amount,
      type,
      categoryName,
      subcategoryName,
      paymentMethodName,
      date,
      description,
    } = req.body;

    const userId = req.user; // Assumes auth middleware attaches user._id

    // Debug logs
    console.log("➡️ Updating Transaction ID:", id);
    console.log("🔐 User ID:", userId);
    console.log("📝 Body:", req.body);

    // 1. Upsert Category
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await new Category({ name: categoryName }).save();
    }

    // 2. Upsert Subcategory
    let subcategory = await Subcategory.findOne({ name: subcategoryName });
    if (!subcategory) {
      subcategory = await new Subcategory({
        name: subcategoryName,
        category: category._id,
      }).save();
    }

    // 3. Upsert Payment Method
    let paymentMethod = await PaymentMethod.findOne({
      name: paymentMethodName,
    });
    if (!paymentMethod) {
      paymentMethod = await new PaymentMethod({
        name: paymentMethodName,
      }).save();
    }

    // 4. Update Transaction
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId }, // ✅ Use 'userId' not 'user'
      {
        amount,
        type,
        category: category._id,
        subcategory: subcategory._id,
        paymentMethod: paymentMethod._id,
        date,
        description,
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("❌ Update error:", error);
    return res.status(500).json({ error: "Failed to update transaction" });
  }
};
//get tranctionby id
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user; // from authMiddleware

    console.log("🧾 Fetching transaction ID:", id);
    console.log("👤 For user:", userId);

    const transaction = await Transaction.findOne({ _id: id, userId })
      .populate("category")
      .populate("subcategory")
      .populate("paymentMethod");

    if (!transaction) {
      console.log("🚫 Transaction not found for this user.");
      return res.status(404).json({ error: "Transaction not found" });
    }
    console.log(transaction);
    return res.status(200).json(transaction);
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//Delete route
export const deleteFullTransaction = async (req, res) => {
  try {
    const { id } = req.params; // Transaction ID from URL

    // 1. Find the transaction
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // 2. Delete associated Category, Subcategory, and PaymentMethod
    await Category.findByIdAndDelete(transaction.category);
    await Subcategory.findByIdAndDelete(transaction.subcategory);
    await PaymentMethod.findByIdAndDelete(transaction.paymentMethod);

    // 3. Delete the transaction itself
    await Transaction.findByIdAndDelete(id);

    res.json({
      message: "Transaction and associated data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//
export const filterTransactions = async (req, res) => {
  try {
    const userId = req.user; // From auth middleware

    const {
      type, // Income or Expense
      startDate,
      endDate,
      category,
      subcategory,
      paymentMethod,
      description,
    } = req.query;

    const filter = { userId: new mongoose.Types.ObjectId(userId) };

    if (type) {
      filter.type = type;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    if (category) {
      filter.category = category; // should be ObjectId string
    }

    if (subcategory) {
      filter.subcategory = subcategory; // should be ObjectId string
    }

    if (paymentMethod) {
      filter.paymentMethod = paymentMethod; // should be ObjectId string
    }

    if (description) {
      filter.description = { $regex: description, $options: "i" }; // case-insensitive partial match
    }

    const transactions = await Transaction.find(filter)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("paymentMethod", "name")
      .sort({ date: -1 });

    res.json({ total: transactions.length, transactions });
  } catch (error) {
    console.error("Error filtering transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
