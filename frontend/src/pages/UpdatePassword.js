import React, { useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

const UpdatePassword = () => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/auth/update-password",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated successfully ✅");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-poppins px-4">
      <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Update Password</h2>
          <LogoutButton />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
