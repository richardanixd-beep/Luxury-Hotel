import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/rooms`);
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setErr("Could not load rooms");
    }
  };

  return (
    <div>
      <h2>Rooms</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      {rooms.map(r => <RoomCard key={r._id} room={r} />)}
    </div>
  );
}
