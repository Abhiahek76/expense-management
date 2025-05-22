import React from "react";
//import heroImg from "../assets/3905273.jpg";
import heroImg from "../assets/3905273.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 py-10 md:py-20 gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 lg:px-25">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
            Welcome to <span className="text-blue-600">Expenditure.</span>
            <br />
            To <span className="text-black">Analyze</span> your spend.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Start tracking your daily expenses from any corner of the world.
          </p>

          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/login">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition">
                  Start Now
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-6 py-3 rounded-md shadow hover:from-blue-200 hover:to-blue-300 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full max-w-sm md:max-w-md mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
