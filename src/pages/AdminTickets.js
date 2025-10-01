import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminTickets.css";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/tickets");
      setTickets(res.data.tickets);
    } catch (err) {
      console.error("❌ Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.filter((u) => u.role === "support" || u.role === "admin"));
    } catch (err) {
      console.error("❌ Error loading users:", err);
    }
  };

  useEffect(() => {
    loadTickets();
    loadUsers();
  }, []);

  const forceClose = async (id) => {
    try {
      await api.patch(`/admin/tickets/${id}/force`, { status: "Closed" });
      loadTickets();
    } catch (err) {
      console.error("❌ Error closing ticket:", err);
    }
  };

  const forceReassign = async (id, assigneeId) => {
    try {
      await api.patch(`/admin/tickets/${id}/force`, {
        action: "reassign",
        assigneeId,
      });
      loadTickets();
    } catch (err) {
      console.error("❌ Error reassigning ticket:", err.response?.data || err);
    }
  };

  return (
    <div className="admin-tickets-container">
      <h2 className="admin-tickets-title">Admin Ticket Management</h2>

      {loading ? (
        <p className="loading-text">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="empty-text">No tickets found</p>
      ) : (
        <table className="admin-tickets-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td>{t.subject}</td>
                <td>{t.status}</td>
                <td>{t.owner?.name}</td>
                <td>
                  <select
                    value={t.assignee?._id || ""}
                    onChange={(e) => forceReassign(t._id, e.target.value)}
                    className="ticket-assignee-select"
                  >
                    <option value="">-- Unassigned --</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => forceClose(t._id)}
                    className="ticket-btn ticket-btn-red"
                  >
                    Force Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
