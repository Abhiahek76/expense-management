import React from "react";
import notFoundImage from "../assets/404-error-page.avif"; // Adjust the path based on your folder structure

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="max-w-md w-full mb-8"
      />
      <h2 className="text-xl text-blue-400 font-semibold">404 Not Found</h2>
      <p className="text-2xl font-bold mt-2">
        Whoops! That page doesn’t exist.
      </p>
    </div>
  );
};

export default NotFound;
