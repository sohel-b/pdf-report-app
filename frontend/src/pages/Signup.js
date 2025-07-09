import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:3001/auth/signup", { email, password });
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <BackButton />
      <div className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">Signup</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border w-full px-3 py-2 mb-4 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border w-full px-3 py-2 mb-4 rounded"
        />
        <button
          onClick={handleSignup}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-full rounded"
        >
          Signup
        </button>
        {message && <p className="mt-4 text-center text-red-600 text-sm">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;