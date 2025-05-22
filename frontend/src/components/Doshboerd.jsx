import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "../redux/State/summary";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalIncome,
    totalExpense,
    balance,
    monthlyBreakdown,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-6 pt-25">
      <h1 className="text-2xl font-bold mb-4">Dashboard Summary</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold text-lg text-green-800">Income</h2>
          <p className="text-2xl font-bold">₹{totalIncome}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold text-lg text-red-800">Expense</h2>
          <p className="text-2xl font-bold">₹{totalExpense}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold text-lg text-blue-800">Balance</h2>
          <p className="text-2xl font-bold">₹{balance}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Monthly Breakdown</h2>
      {monthlyBreakdown?.length > 0 ? (
        <div className="bg-white p-4 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyBreakdown.map((item) => ({
                ...item,
                label: `${item.month}/${item.year}`,
              }))}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" name="Income" />
              <Bar dataKey="expense" fill="#f87171" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
