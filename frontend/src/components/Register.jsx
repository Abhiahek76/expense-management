import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/State/auth";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link
import { toast } from "react-toastify";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (authStatus === "succeeded") {
      toast.success("Registration Successful!", { position: "top-center" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [authStatus, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError, { position: "top-center" });
    }
  }, [authError]);

  return (
    <div className="flex items-center justify-center min-h-screen shadow">
      <form onSubmit={handleSubmit} className="p-10 rounded-lg w-96">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>

        <div className="flex items-center my-10">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="mx-4 text-black text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>

        <button
          type="submit"
          className="w-full mt-10 bg-green-800 text-white font-semibold py-2 rounded-md hover:bg-green-700"
        >
          {authStatus === "loading" ? "Registering..." : "Register"}
        </button>

        {/* ✅ Login link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
