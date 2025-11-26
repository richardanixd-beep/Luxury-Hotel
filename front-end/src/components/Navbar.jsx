import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-inner">
        <div>
          <Link to="/">El Nido Haven</Link>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Link to="/rooms">Rooms</Link>
          <Link to="/feedback">Feedback</Link>
          {token ? (
            <>
              {user && JSON.parse(user).role === "admin" && <Link to="/admin">Admin</Link>}
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
