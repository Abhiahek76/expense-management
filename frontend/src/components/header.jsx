import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/State/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold lg:pl-28 text-blue-600">
          Expense<span className="text-purple-500">Manager</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:flex">
          <Link
            to="/dashboard-summary"
            className="text-gray-700 hover:text-blue-500"
          >
            Dashboard
          </Link>
          <Link to="/expense" className="text-gray-700 hover:text-blue-500">
            Transactions
          </Link>
          <Link to="/report" className="text-gray-700 hover:text-blue-500">
            Report
          </Link>
        </nav>

        {/* Desktop Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-blue-500 text-white  px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link
            to="/dashboard-summary"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-500"
          >
            Dashboard
          </Link>
          <Link
            to="/expense"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-500"
          >
            Expense
          </Link>
          <Link
            to="/report"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-500"
          >
            Report
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block bg-blue-500 text-white px-4 py-2 rounded-full text-center hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
