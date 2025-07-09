import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function Dashboard() {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const generateReport = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3001/generate-report?session_id=${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`PDF saved at: ${res.data.path}`);
    } catch (err) {
      setMessage("Failed to generate PDF");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <BackButton />
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <input
          type="text"
          placeholder="Enter session ID"
          onChange={(e) => setSessionId(e.target.value)}
          className="border w-full px-3 py-2 mb-4 rounded"
        />
        <button
          onClick={generateReport}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded mb-4"
        >
          Generate PDF
        </button>
        {message && <p className="text-sm text-gray-700 mb-2">{message}</p>}
        <button
          onClick={handleLogout}
          className="text-red-500 text-sm underline hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
