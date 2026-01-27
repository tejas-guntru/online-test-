/**
 * AdminHeader Component
 *
 * PURPOSE:
 * - Displays the main heading for the Admin Dashboard
 * - Provides navigation between Admin sections (Tests / Modules)
 *
 * USED IN:
 * - Admin.jsx
 * - AdminModules.jsx
 *
 * DESIGN NOTES:
 * - Still stateless (uses router context only)
 * - No props
 * - Centralized admin navigation
 */

import { Link, useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();

  const isTests = location.pathname === "/admin";
  const isModules = location.pathname.startsWith("/admin/modules");

  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg space-y-4">

      {/* ================= TOP ROW ================= */}
      <div className="flex items-center justify-between">

        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Create and manage platform content
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex gap-2">
          <Link
            to="/admin"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              isTests
                ? "bg-blue-700 text-white shadow-md"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            🧪 Tests
          </Link>

          <Link
            to="/admin/modules"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              isModules
                ? "bg-blue-700 text-white shadow-md"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            📚 Modules
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminHeader;
