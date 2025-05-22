import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../redux/State/tentriestabel";

const TransactionEditForm = ({ transaction, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transaction);

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    categoryName: "",
    subcategoryName: "",
    paymentMethodName: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount || "",
        type: transaction.type?.toLowerCase() || "expense",
        categoryName: transaction.category?.name || "",
        subcategoryName: transaction.subcategory?.name || "",
        paymentMethodName: transaction.paymentMethod?.name || "",
        date: transaction.date?.slice(0, 10) || "",
        description: transaction.description || "",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transaction?._id) {
      dispatch(
        updateTransaction({ id: transaction._id, updatedData: formData })
      ).then(() => {
        onCancel(); // close form after update
      });
    }
  };
  return (
    <div className="max-w-md mx-auto  pt-25  bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Edit Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          name="subcategoryName"
          value={formData.subcategoryName}
          onChange={handleChange}
          placeholder="Subcategory"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          name="paymentMethodName"
          value={formData.paymentMethodName}
          onChange={handleChange}
          placeholder="Payment Method"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 p-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 p-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default TransactionEditForm;
