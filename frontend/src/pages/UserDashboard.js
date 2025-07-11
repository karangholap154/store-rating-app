import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("https://store-rating-app-3rta.onrender.com/api/user/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStores(res.data.stores);
    } catch (err) {
      console.error("Failed to fetch stores:", err.response?.data?.message);
    }
  };

  const handleRatingChange = (storeId, value) => {
    setRatings({ ...ratings, [storeId]: value });
  };

  const submitRating = async (storeId) => {
    const rating = parseInt(ratings[storeId]);
    if (!rating || rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    try {
      await axios.post(
        "https://store-rating-app-3rta.onrender.com/api/user/rate",
        { storeId, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Rating submitted ✅");
      fetchStores(); // Refresh data
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit rating");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-700">User Dashboard</h2>
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

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-blue-600">{store.name}</h3>
            <p className="text-gray-600 mb-1">{store.address}</p>
            <p className="text-sm text-gray-700">
              ⭐ Average Rating: {store.averageRating}
            </p>
            <p className="text-sm text-gray-700">
              Your Rating:{" "}
              {store.userRating ? store.userRating : "Not rated yet"}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rate 1–5"
                value={ratings[store.id] || ""}
                onChange={(e) =>
                  handleRatingChange(store.id, e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1 w-20"
              />
              <button
                onClick={() => submitRating(store.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
