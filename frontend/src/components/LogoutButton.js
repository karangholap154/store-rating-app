import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // remove token, role, etc.
    navigate("/"); // redirect to login
  };

  return (
    <button onClick={handleLogout} style={{ float: "right", marginBottom: "20px" }}>
      🔓 Logout
    </button>
  );
};

export default LogoutButton;
