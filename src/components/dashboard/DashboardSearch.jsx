/**
 * DashboardSearch Component
 *
 * PURPOSE:
 * - Provides a search input to filter tests on the dashboard
 * - Allows users to quickly find tests by title or description
 *
 * DESIGN CHOICE:
 * - Controlled input (value + onChange)
 * - Search logic lives in parent (Dashboard.jsx)
 * - Keeps this component simple and reusable
 *
 * PROPS:
 * @param {string} value     - Current search term
 * @param {Function} onChange - Updates search term in parent
 */
const DashboardSearch = ({ value, onChange }) => {
  return (
    <div className="mb-8">
      
      {/* ================= SEARCH INPUT ================= */}
      <input
        type="text"
        placeholder="Search tests..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-1/2 border p-3 rounded-lg"
      />

    </div>
  );
};

export default DashboardSearch;
