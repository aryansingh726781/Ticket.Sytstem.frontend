import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import "./Dashboard.css"; // Import CSS file

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await api.get("/tickets");
        setTickets(r.data.tickets || []);
      } catch (e) {
        console.error("❌ Error loading tickets:", e);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Welcome, {user?.name || "User"}</h1>
          <Link to="/tickets/create" className="create-btn">
            + Create Ticket
          </Link>
        </div>

        {/* Tickets Section */}
        <div className="tickets-section">
          <h3>Your Tickets</h3>

          {loading ? (
            <p className="loading">Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <p className="empty">No tickets yet. Create one above!</p>
          ) : (
            <div className="table-wrapper">
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t, idx) => (
                    <tr key={t._id} className={idx % 2 === 0 ? "even" : "odd"}>
                      <td>
                        <Link to={`/tickets/${t._id}`} className="ticket-link">
                          {t.subject}
                        </Link>
                      </td>
                      <td>
                        <span className={`status-badge ${t.status.toLowerCase().replace(" ", "-")}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge ${t.priority.toLowerCase()}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="created-date">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-right">
                        <Link to={`/tickets/${t._id}`} className="view-link">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
