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
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          {/* ================= TEST TITLE ================= */}
          <h3 className="text-lg font-semibold mb-1">
            {test.title}
          </h3>

          {/* ================= DESCRIPTION =================
              Fallback shown if description is missing */}
          <p className="text-sm text-gray-600 mb-2">
            {test.description || "No description"}
          </p>

          {/* ================= TEST META INFO ================= */}
          <div className="text-sm text-gray-500 space-y-1 mb-4">
            <p>⏱ Duration: {test.duration} mins</p>

            <p>
              📊 Attempts:{" "}
              <span className="font-semibold">
                {attemptCounts[test.id] || 0}
              </span>
            </p>

            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  test.isActive
                    ? "text-green-600"
                    : "text-red-500"
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
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {test.isActive ? "Revoke" : "Activate"}
            </button>

            {/* Open read-only Edit / Delete modal */}
            <button
              onClick={() => onEdit(test)}
              className="flex-1 py-1.5 rounded bg-gray-800 text-white hover:bg-gray-900"
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
