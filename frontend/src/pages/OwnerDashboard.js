import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

const OwnerDashboard = () => {
  const token = localStorage.getItem("token");
  const [store, setStore] = useState(null);
  const [users, setUsers] = useState([]);
  const [avgRating, setAvgRating] = useState("N/A");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/owner/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStore(res.data.store);
      setAvgRating(res.data.averageRating);
      setUsers(res.data.ratedBy || []);
    } catch (err) {
      console.error("Owner dashboard error:", err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-700">Store Owner Dashboard</h2>
        <div className="flex gap-4">
          <a
            href="/update-password"
            className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Update Password
          </a>
          <LogoutButton />
        </div>
      </div>

      {store ? (
        <div className="bg-white shadow-md rounded p-6 max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">{store.name}</h3>
          <p className="text-gray-700 mb-1"><strong>Address:</strong> {store.address}</p>
          <p className="text-gray-700 mb-4"><strong>Average Rating:</strong> ⭐ {avgRating}</p>

          <h4 className="text-lg font-semibold mb-2">👥 Rated By:</h4>
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u.id} className="border-b pb-2 text-sm">
                <strong>{u.name}</strong> ({u.email}) – ⭐ {u.rating}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-600">No store assigned to this owner.</p>
      )}
    </div>
  );
};

export default OwnerDashboard;
