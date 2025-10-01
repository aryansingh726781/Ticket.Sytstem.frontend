import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./SupportPanel.css"; // ✅ import

export default function SupportPanel() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({});

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tickets");
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("❌ Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const takeTicket = async (id) => {
    try {
      await api.patch(`/tickets/${id}/assign`, { assigneeId: null });
      loadTickets();
    } catch (err) {
      console.error("❌ Error taking ticket:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/tickets/${id}/status`, { status });
      loadTickets();
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  const addComment = async (id) => {
    try {
      if (!comment[id]) return;
      await api.post(`/tickets/${id}/comments`, { text: comment[id] });
      setComment({ ...comment, [id]: "" });
      loadTickets();
    } catch (err) {
      console.error("❌ Error adding comment:", err);
    }
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="support-panel">
      <h2>🎧 Support Panel</h2>

      {tickets.length === 0 ? (
        <p>No tickets available</p>
      ) : (
        <table className="support-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Owner</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td>{t.subject}</td>
                <td>{t.owner?.name}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>{t.assignee?.name || "Unassigned"}</td>
                <td>
                  {!t.assignee && (
                    <button
                      onClick={() => takeTicket(t._id)}
                      className="btn btn-blue"
                    >
                      Take Ticket
                    </button>
                  )}

                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
                    className="ticket-status"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <div className="comment-box">
                    <input
                      type="text"
                      placeholder="Add comment"
                      value={comment[t._id] || ""}
                      onChange={(e) =>
                        setComment({ ...comment, [t._id]: e.target.value })
                      }
                    />
                    <button
                      onClick={() => addComment(t._id)}
                      className="btn btn-green"
                    >
                      Add
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
