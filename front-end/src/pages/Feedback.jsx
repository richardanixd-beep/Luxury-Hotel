import React, { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return setMsg("Please login to send feedback");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ rating, comment })
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || "Failed");
      setMsg("Thanks for the feedback!");
      setComment("");
      setRating(5);
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div>
      <h2>Feedback</h2>
      <form onSubmit={submit}>
        <label>Rating</label>
        <select className="input" value={rating} onChange={e=>setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>
        <label>Comment</label>
        <textarea className="input" value={comment} onChange={e=>setComment(e.target.value)} />
        <button className="btn">Send Feedback</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
