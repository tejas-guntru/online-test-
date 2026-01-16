// TestList.jsx
// Table-based layout for managing tests in the Admin dashboard

/**
 * TestList Component
 *
 * PURPOSE:
 * - Displays all tests in a structured table format
 * - Best suited for admins who want a compact, data-dense view
 * - Allows activating/revoking tests and opening the test details modal
 *
 * USED IN:
 * - Admin.jsx (when viewMode === "list")
 *
 * PROPS:
 * @param {Array} tests
 *   List of test objects fetched from Firestore
 *
 * @param {Object} attemptCounts
 *   Map of testId → number of attempts
 *   Used to show how many students attempted each test
 *
 * @param {Function} onToggle
 *   Callback to activate or revoke a test
 *   Called with (testId, currentStatus)
 *
 * @param {Function} onEdit
 *   Callback to open EditTestModal
 *   Receives the full test object
 *
 * NOTE:
 * - This component is PRESENTATIONAL ONLY
 * - No Firestore logic exists here
 * - All state and side effects live in Admin.jsx
 */

const TestList = ({
  tests,
  attemptCounts,
  onToggle,
  onEdit,
}) => {
  return (
    /* ================= TABLE CONTAINER =================
       overflow-x-auto ensures usability on small screens */
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">

        {/* ================= TABLE HEADER ================= */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Attempts</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        {/* ================= TABLE BODY ================= */}
        <tbody>
          {tests.map((test) => (
            <tr
              key={test.id}
              className="border-t hover:bg-gray-50"
            >
              {/* TEST TITLE */}
              <td className="px-4 py-3 font-medium">
                {test.title}
              </td>

              {/* TEST DURATION */}
              <td className="px-4 py-3">
                {test.duration} mins
              </td>

              {/* ATTEMPT COUNT */}
              <td className="px-4 py-3">
                <span className="font-semibold">
                  {attemptCounts[test.id] || 0}
                </span>
              </td>

              {/* ACTIVE / REVOKED STATUS */}
              <td className="px-4 py-3">
                <span
                  className={`font-semibold ${
                    test.isActive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {test.isActive ? "Active" : "Revoked"}
                </span>
              </td>

              {/* ACTION BUTTONS */}
              <td className="px-4 py-3">
                <div className="flex gap-2">

                  {/* Activate / Revoke Button */}
                  <button
                    onClick={() =>
                      onToggle(test.id, test.isActive)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      test.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {test.isActive ? "Revoke" : "Activate"}
                  </button>

                  {/* Open Read-Only Test Modal */}
                  <button
                    onClick={() => onEdit(test)}
                    className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-900"
                  >
                    Edit
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestList;
