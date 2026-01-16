/**
 * AdminHeader Component
 *
 * PURPOSE:
 * - Displays the main heading for the Admin Dashboard
 * - Provides contextual information about what admins can do
 *
 * USED IN:
 * - Admin.jsx (top section of admin page)
 *
 * DESIGN NOTES:
 * - Pure presentational component
 * - No state, no props
 * - Keeps admin UI consistent and clear
 */
const AdminHeader = () => (
  <div className="bg-white p-6 rounded-xl shadow">
    
    {/* ================= MAIN TITLE ================= */}
    <h1 className="text-3xl font-bold text-gray-800">
      Admin Dashboard
    </h1>

    {/* ================= SUBTITLE / CONTEXT ================= */}
    <p className="text-gray-500 mt-1">
      Create and manage online tests
    </p>

  </div>
);

export default AdminHeader;
