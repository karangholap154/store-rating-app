import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://store-rating-app-3rta.onrender.com/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      alert("Login Successful ✅");

      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "owner") {
        window.location.href = "/owner";
      } else {
        window.location.href = "/user";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4 font-poppins">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login to Store Rating App</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 text-sm text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded">
          <p className="font-medium mb-2 text-gray-800">🔑 Demo Logins:</p>
          <p><strong>Admin:</strong> admin@example.com / Admin@123</p>
          <p><strong>Owner:</strong> owner@example.com / Owner@123</p>
          <p><strong>User:</strong> user@example.com / User@123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
