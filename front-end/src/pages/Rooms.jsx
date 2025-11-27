import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/rooms`);
      if (!res.ok) throw new Error("Failed to fetch rooms");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setError(err.message || "Could not load rooms");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="rooms-container">
      <h2>Available Rooms</h2>
      <div className="rooms-grid">
        {rooms.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          rooms.map(r => <RoomCard key={r._id} room={r} />)
        )}
      </div>
    </div>
  );
}
