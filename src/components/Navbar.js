// import React, { useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'

// export default function Navbar(){
//   const { user, logout } = useContext(AuthContext)
//   const nav = useNavigate()
//   const handleLogout = () => { logout(); nav('/login') }

//   return (
//     <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 20px',background:'#111827',color:'#fff'}}>
//       <div>
//         <Link to="/" style={{color:'#fff',textDecoration:'none',fontWeight:700}}>Ticketing</Link>
//       </div>
//       <div style={{display:'flex',gap:12,alignItems:'center'}}>
//         {user ? (
//           <>
//             <Link to="/tickets" style={{color:'#fff'}}>My Tickets</Link>
//             <Link to="/tickets/create" style={{color:'#fff'}}>New Ticket</Link>
//             {['support','admin'].includes(user.role) && <Link to="/support" style={{color:'#fff'}}>Support</Link>}
//             {user.role==='admin' && <Link to="/admin" style={{color:'#fff'}}>Admin</Link>}
//             <button onClick={handleLogout} style={{marginLeft:8}}>Logout</button>
//             <span style={{marginLeft:8,fontSize:12,opacity:0.9}}>{user.name} ({user.role})</span>
//           </>
//         ) : (
//           <>
//             <Link to="/login" style={{color:'#fff'}}>Login</Link>
//             <Link to="/register" style={{color:'#fff'}}>Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   )
// }








import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "#111827",
        color: "#fff",
      }}
    >
      {/* Logo / Home */}
      <div>
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}
        >
          Ticketing
        </Link>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {user ? (
          <>
            <Link to="/" style={{ color: "#fff" }}>
              Dashboard
            </Link>
            <Link to="/tickets" style={{ color: "#fff" }}>
              My Tickets
            </Link>
            <Link to="/tickets/create" style={{ color: "#fff" }}>
              New Ticket
            </Link>

            {["support", "admin"].includes(user.role) && (
              <Link to="/support" style={{ color: "#fff" }}>
                Support Panel
              </Link>
            )}

            {user?.role === "admin" && (
              <>
                <Link to="/admin/users" style={{ color: "#fff" }}>
                  Manage Users
                </Link>
                <Link to="/admin/tickets" style={{ color: "#fff" }}>
                  Manage Tickets
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              style={{
                marginLeft: 8,
                background: "#ef4444",
                border: "none",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Logout
            </button>

            <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.9 }}>
              {user.name} ({user.role})
            </span>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#fff" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
