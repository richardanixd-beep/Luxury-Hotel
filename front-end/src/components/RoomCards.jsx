import React from "react";
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <div className="card">
      <h3>{room.number} — {room.type}</h3>
      <p className="small">₱{room.price} / night</p>
      <p className="small">Status: {room.status}</p>
      <div style={{ marginTop: 8 }}>
        <Link to={`/rooms/${room._id}`} className="btn">Book</Link>
      </div>
    </div>
  );
}
