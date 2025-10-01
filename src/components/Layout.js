import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 z-20`}
      >
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Helpdesk</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/tickets/create"
            className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700"
          >
            ➕ Create Ticket
          </Link>
          <Link
            to="/tickets"
            className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700"
          >
            🎫 My Tickets
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin/tickets"
              className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              🛠 Admin Panel
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {user?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">👤 {user?.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
