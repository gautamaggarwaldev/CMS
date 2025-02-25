import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { isNotEmpty } from "../utils/validation.js";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    navigate("/view");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNotEmpty(username) || !isNotEmpty(password)) {
      setError("Please fill in all fields");
      return;
    }
    const result = login(username, password);
    if (result.success) {
      navigate("/view");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Login Form */}
      <div className="w-3/4 flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 ml-[25%]">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-username" className="block text-gray-700 font-medium">Username:</label>
              <input
                id="login-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-gray-700 font-medium">Password:</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300 hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;