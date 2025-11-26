import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Booking() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/rooms`);
      const data = await res.json();
      const found = data.find(r => r._id === id);
      setRoom(found);
    } catch (err) {
      setMsg("Could not load room");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    const token = localStorage.getItem("token");
    if (!token) return setMsg("Please login first");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ roomId: id, checkIn, checkOut })
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || "Booking failed");
      setMsg("Booking successful");
    } catch (err) {
      setMsg("Network error");
    }
  };

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h2>Book Room {room.number}</h2>
      <p className="small">₱{room.price}/night • {room.type}</p>
      <form onSubmit={submit}>
        <label>Check-in</label>
        <input className="input" type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
        <label>Check-out</label>
        <input className="input" type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
        <button className="btn" type="submit">Book</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
