import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to El Nido Haven</h1>
        <p className="hero-subtitle">Experience luxury and comfort in the heart of El Nido</p>
        <p className="hero-description">
          Discover our beautiful rooms and book your perfect stay with ease.
        </p>
        {!isAuthenticated ? (
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        ) : (
          <Link to="/rooms" className="btn btn-primary">View Rooms</Link>
        )}
      </div>
      <div className="features">
        <div className="feature">
          <h3>Luxury Rooms</h3>
          <p>Comfortable and stylish accommodations for your stay.</p>
        </div>
        <div className="feature">
          <h3>Easy Booking</h3>
          <p>Simple and secure online booking process.</p>
        </div>
        <div className="feature">
          <h3>Prime Location</h3>
          <p>Located in the heart of El Nido with stunning views.</p>
        </div>
      </div>
    </div>
  );
}
