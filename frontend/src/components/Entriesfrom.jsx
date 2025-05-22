import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFullTransaction } from "../redux/State/tentriestabel";
import { useNavigate } from "react-router-dom";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.transaction);

  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    categoryName: "",
    subcategoryName: "",
    paymentMethodName: "",
    date: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      Number(formData.amount) <= 0
    ) {
      errors.amount = "Please enter a valid amount.";
    }
    if (!formData.type) errors.type = "Type is required.";
    if (!formData.categoryName) errors.categoryName = "Category is required.";
    if (!formData.subcategoryName)
      errors.subcategoryName = "Subcategory is required.";
    if (!formData.paymentMethodName)
      errors.paymentMethodName = "Payment method is required.";
    if (!formData.date) errors.date = "Date is required.";
    if (!formData.description.trim())
      errors.description = "Description is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(createFullTransaction(formData));
    navigate("/report");
  };

  const inputClass = (field) =>
    `w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
      formErrors[field]
        ? "border-red-500 focus:ring-red-300"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  return (
    <div className="min-h-screen flex  pt-25 items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="backdrop-blur-md bg-white/60 border border-white/40 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-md">
          Create Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Amount */}
          <div>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className={inputClass("amount")}
            />
            {formErrors.amount && (
              <p className="text-red-500 text-sm">{formErrors.amount}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputClass("type")}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            {formErrors.type && (
              <p className="text-red-500 text-sm">{formErrors.type}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className={inputClass("categoryName")}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>
            {formErrors.categoryName && (
              <p className="text-red-500 text-sm">{formErrors.categoryName}</p>
            )}
          </div>

          {/* Subcategory */}
          <div>
            <input
              name="subcategoryName"
              value={formData.subcategoryName}
              onChange={handleChange}
              placeholder="Subcategory"
              className={inputClass("subcategoryName")}
            />
            {formErrors.subcategoryName && (
              <p className="text-red-500 text-sm">
                {formErrors.subcategoryName}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <select
              name="paymentMethodName"
              value={formData.paymentMethodName}
              onChange={handleChange}
              className={inputClass("paymentMethodName")}
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.paymentMethodName && (
              <p className="text-red-500 text-sm">
                {formErrors.paymentMethodName}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass("date")}
            />
            {formErrors.date && (
              <p className="text-red-500 text-sm">{formErrors.date}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className={inputClass("description")}
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
            }`}
          >
            {loading ? "Creating..." : "Create Transaction"}
          </button>

          {/* General Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
