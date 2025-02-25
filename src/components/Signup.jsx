import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import {isNotEmpty} from "../utils/validation.js";

function Signup() {
  const navigate = useNavigate();
  const { user, signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    navigate("/view");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNotEmpty(username) || !isNotEmpty(password) || !isNotEmpty(confirmPassword)) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = signup(username, password);
    if (result.success) {
      navigate("/view");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full transform transition-all duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-username" className="block text-gray-700 font-medium">Username:</label>
            <input
              id="signup-username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-gray-700 font-medium">Password:</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="signup-confirm-password" className="block text-gray-700 font-medium">Confirm Password:</label>
            <input
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300 hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
