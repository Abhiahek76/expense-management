import React from "react";
import { Routes, Route } from "react-router-dom";
import EntryForm from "../components/Entriesfrom";
import Register from "../components/Register";
import Login from "../components/Login";
import EntryTable from "../components/EntryTable";
import EditTransactionPage from "../components/EditTransactionPage";
import Hero from "../components/Hero";
import Header from "../components/header";
import Dashboard from "../components/Doshboerd";
import PrivateRoute from "../components/PrivateRoute";
import Forget from "../components/Forgotpassword";
import NotFound from "../components/NotFound";

export default function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forget />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/expense" element={<EntryForm />} />
          <Route path="/report" element={<EntryTable />} />
          <Route path="/edit/:id" element={<EditTransactionPage />} />
          <Route path="/dashboard-summary" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
