import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setErr("Please login as admin");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/reports/summary`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) return setErr(data.message || "Failed");
      setSummary(data);
    } catch (err) {
      setErr("Network error");
    }
  };

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Summary</h2>
      <div className="card">
        <p>Total rooms: {summary.totalRooms}</p>
        <p>Occupied (Reserved/Checked-in): {summary.occupiedBookings}</p>
        <p>Occupancy rate: {summary.occupancyRate.toFixed(2)}%</p>
        <p>Total revenue: ₱{summary.totalRevenue}</p>
        <p>Total bookings: {summary.totalBookings}</p>
      </div>
    </div>
  );
}
