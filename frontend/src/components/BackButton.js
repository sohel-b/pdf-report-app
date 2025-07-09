import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-md shadow-sm hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
      ← Back
    </button>
  );
}

export default BackButton;
