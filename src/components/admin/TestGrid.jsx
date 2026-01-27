// TestGrid.jsx
// Grid-based layout for displaying all tests in the Admin dashboard

/**
 * TestGrid Component
 *
 * PURPOSE:
 * - Displays all tests in a responsive card-style grid
 * - Provides a quick visual overview for admins
 * - Allows admins to activate/revoke tests or open the test modal
 *
 * USED IN:
 * - Admin.jsx (when viewMode === "grid")
 *
 * PROPS:
 * @param {Array} tests
 *   List of test objects fetched from Firestore
 *
 * @param {Object} attemptCounts
 *   Map of testId → number of attempts
 *   Used to show analytics per test
 *
 * @param {Function} onToggle
 *   Callback to activate or revoke a test
 *   Called with (testId, currentStatus)
 *
 * @param {Function} onEdit
 *   Callback to open the EditTestModal
 *   Receives the full test object
 */

const TestGrid = ({ tests, attemptCounts, onToggle, onEdit }) => {
  return (
    /* ================= GRID LAYOUT =================
       Responsive grid:
       - 1 column on mobile
       - 2 columns on tablets
       - 3 columns on desktop */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {tests.map((test) => (
        <div
          key={test.id}
          className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition text-gray-100"
        >
          {/* ================= TEST TITLE ================= */}
          <h3 className="text-lg font-semibold mb-1">
            {test.title}
          </h3>

          {/* ================= DESCRIPTION =================
              Fallback shown if description is missing */}
          <p className="text-sm text-gray-400 mb-2">
            {test.description || "No description"}
          </p>

          {/* ================= TEST META INFO ================= */}
          <div className="text-sm text-gray-400 space-y-1 mb-4">
            <p>⏱ Duration: {test.duration} mins</p>

            <p>
              📊 Attempts:{" "}
              <span className="font-semibold text-gray-200">
                {attemptCounts[test.id] || 0}
              </span>
            </p>

            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  test.isActive
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {test.isActive ? "Active" : "Revoked"}
              </span>
            </p>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="flex gap-2">

            {/* Activate / Revoke Test */}
            <button
              onClick={() => onToggle(test.id, test.isActive)}
              className={`flex-1 py-1.5 rounded text-white ${
                test.isActive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {test.isActive ? "Revoke" : "Activate"}
            </button>

            {/* Open read-only Edit / Delete modal */}
            <button
              onClick={() => onEdit(test)}
              className="flex-1 py-1.5 rounded bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestGrid;
