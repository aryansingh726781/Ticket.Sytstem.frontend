// // import React, { useEffect, useState } from 'react'
// // import api from '../api/axios'
// // import { Link } from 'react-router-dom'


// // export default function Tickets(){
// // const [tickets, setTickets] = useState([])
// // const [q, setQ] = useState('')


// // useEffect(()=>{ load() }, [])
// // async function load(){
// // try{ const r = await api.get('/tickets', { params: { q } }); setTickets(r.data.tickets) }catch(e){ console.error(e) }
// // }


// // return (
// // <div style={{padding:20}}>
// // <h2>Tickets</h2>
// // <div style={{marginBottom:12}}>
// // <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search subject" />
// // <button onClick={load}>Search</button>
// // </div>
// // {tickets.map(t=> (
// // <div key={t._1d} style={{border:'1px solid #eee',padding:12,marginBottom:8}}>
// // <Link to={`/tickets/${t._id}`} style={{fontWeight:700}}>{t.subject}</Link>
// // <div>{t.description?.slice(0,160)}</div>
// // </div>
// // ))}
// // </div>
// // )
// // }

// // src/pages/Tickets.js
// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Tickets() {
//   const [tickets, setTickets] = useState([]);   // always an array
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [filters, setFilters] = useState({ q: "", status: "", priority: "" });
//   const [loading, setLoading] = useState(true);

//   const loadTickets = async () => {
//     try {
//       setLoading(true);

//       // ✅ safer API call with wrapper
//       const res = await api.get('/tickets',{
//         params: { ...filters, page, limit },
//       });

//       setTickets(res.data?.tickets || []); // default to []
//       setTotal(res.data?.total || 0);
//     } catch (err) {
//       console.error("❌ Error loading tickets:", err);
//       setTickets([]); // fallback if error
//       setTotal(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTickets();
//   }, [page, filters]);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setPage(1); // reset page on filter change
//   };

//   const totalPages = Math.max(1, Math.ceil(total / limit));

//   if (loading) return <p className="p-4">Loading tickets...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Tickets</h2>

//       {/* Filters */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           name="q"
//           placeholder="Search subject"
//           value={filters.q}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         />
//         <select
//           name="status"
//           value={filters.status}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         >
//           <option value="">All Status</option>
//           <option value="Open">Open</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Closed">Closed</option>
//         </select>
//         <select
//           name="priority"
//           value={filters.priority}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         >
//           <option value="">All Priority</option>
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>
//       </div>

//       {/* Tickets Table */}
//       {tickets.length === 0 ? (
//         <p>No tickets found</p>
//       ) : (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Subject</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Priority</th>
//               <th className="border p-2">Owner</th>
//               <th className="border p-2">Assignee</th>
//               <th className="border p-2">Updated</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((t) => (
//               <tr key={t._id}>
//                 <td className="border p-2">{t.subject}</td>
//                 <td className="border p-2">{t.status}</td>
//                 <td className="border p-2">{t.priority}</td>
//                 <td className="border p-2">{t.owner?.name || "—"}</td>
//                 <td className="border p-2">
//                   {t.assignee?.name || "Unassigned"}
//                 </td>
//                 <td className="border p-2">
//                   {t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "—"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center gap-2 mt-4">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Tickets.css"; // import CSS

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({ q: "", status: "", priority: "" });
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tickets", {
        params: { ...filters, page, limit },
      });
      setTickets(res.data?.tickets || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.error("❌ Error loading tickets:", err);
      setTickets([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading) return <p className="tickets-loading">Loading tickets...</p>;

  return (
    <div className="tickets-page">
      <h2 className="tickets-title">Tickets</h2>

      {/* Filters */}
      <div className="tickets-filters">
        <input
          type="text"
          name="q"
          placeholder="Search subject..."
          value={filters.q}
          onChange={handleFilterChange}
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Table */}
      {tickets.length === 0 ? (
        <p className="tickets-empty">No tickets found</p>
      ) : (
        <div className="tickets-table-wrapper">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Assignee</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id}>
                  <td>{t.subject}</td>
                  <td>
                    <span className={`badge status ${t.status.toLowerCase().replace(" ", "-")}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge priority ${t.priority.toLowerCase()}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td>{t.owner?.name || "—"}</td>
                  <td>{t.assignee?.name || "Unassigned"}</td>
                  <td>{t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="tickets-pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}



