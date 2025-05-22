import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteFullTransaction,
  getAllTransactions,
} from "../redux/State/tentriestabel";
import Pagination from "./Pagination";

const TransactionTable = ({ transactions }) => {
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteFullTransaction(id);
      dispatch(getAllTransactions());
    } catch (error) {
      alert("Failed to delete: " + error.message);
    }
  };

  const filtered = transactions
    .filter((t) => {
      const matchType = filterType ? t.type === filterType : true;
      const matchCategory = filterCategory
        ? t.category?.name === filterCategory
        : true;
      const matchPayment = filterPaymentMethod
        ? t.paymentMethod?.name === filterPaymentMethod
        : true;

      return matchType && matchCategory && matchPayment;
    })
    .sort((a, b) => {
      if (sortColumn === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <select
          className="border rounded px-3 py-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Others">Others</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filterPaymentMethod}
          onChange={(e) => setFilterPaymentMethod(e.target.value)}
        >
          <option value="">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
          <option value="PayPal">PayPal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-200 rounded overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => {
                setSortColumn("date");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Date
            </th>
            <th className="px-4 py-3">Type</th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => {
                setSortColumn("amount");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Amount
            </th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Subcategory</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((t, i) => (
            <tr key={i} className="hover:bg-gray-50 border-t">
              <td className="px-4 py-2">
                {new Date(t.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{t.type}</td>
              <td className="px-4 py-2 text-right">₹{t.amount}</td>
              <td className="px-4 py-2">{t.category?.name || "—"}</td>
              <td className="px-4 py-2">{t.subcategory?.name || "—"}</td>
              <td className="px-4 py-2">{t.paymentMethod?.name || "—"}</td>
              <td className="px-4 py-2">{t.description}</td>
              <td className="px-4 py-2 flex justify-center gap-4">
                <button
                  title="Edit"
                  onClick={() => handleEdit(t._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(t._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionTable;
