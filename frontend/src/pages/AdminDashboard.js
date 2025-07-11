import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://store-rating-app-3rta.onrender.com/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Stats error:", err.response?.data?.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://store-rating-app-3rta.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("User fetch error:", err.response?.data?.message);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get("https://store-rating-app-3rta.onrender.com/api/admin/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data.stores || []);
    } catch (err) {
      console.error("Store fetch error:", err.response?.data?.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://store-rating-app-3rta.onrender.com/api/admin/create-user", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User added ✅");
      setNewUser({ name: "", email: "", password: "", address: "", role: "user" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://store-rating-app-3rta.onrender.com/api/admin/create-store", newStore, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Store added ✅");
      setNewStore({ name: "", email: "", address: "", ownerId: "" });
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-700">Admin Dashboard</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Total Users</p>
          <p className="text-xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Total Stores</p>
          <p className="text-xl font-bold text-blue-600">{stats.totalStores}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-gray-500">Total Ratings</p>
          <p className="text-xl font-bold text-blue-600">{stats.totalRatings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add User Form */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold mb-3">➕ Add User</h3>
          <form onSubmit={handleAddUser} className="space-y-3">
            <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
            <select className="w-full border px-3 py-2 rounded" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option> {/* ✅ Added */}
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create User</button>
          </form>
        </div>

        {/* Add Store Form */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold mb-3">🏪 Add Store</h3>
          <form onSubmit={handleAddStore} className="space-y-3">
            <input className="w-full border px-3 py-2 rounded" placeholder="Store Name" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Store Email" value={newStore.email} onChange={(e) => setNewStore({ ...newStore, email: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Address" value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Owner ID" value={newStore.ownerId} onChange={(e) => setNewStore({ ...newStore, ownerId: e.target.value })} />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Store</button>
          </form>
        </div>
      </div>

      {/* User List */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">👤 All Users</h3>
        <div className="bg-white rounded shadow p-4 space-y-2">
          {users.map((user) => (
            <p key={user.id} className="text-sm text-gray-700">
              ID: {user.id} – {user.name} ({user.role}) – {user.email}
            </p>
          ))}
        </div>
      </div>

      {/* Store List */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">🏬 All Stores</h3>
        <div className="bg-white rounded shadow p-4 space-y-4">
          {stores.map((store) => (
            <div key={store.id} className="text-sm text-gray-700 border-b pb-2">
              <strong>{store.name}</strong> – {store.address} <br />
              Owner: {store.owner?.name} ({store.owner?.email}) – ID: {store.owner?.id} <br />
              ⭐ Average Rating: {store.averageRating}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
