// TestCard → Reusable card UI for displaying a test
// Used for both Available & Attempted tests
import TestCard from "./TestCard";

/**
 * AttemptedTests Component
 *
 * PURPOSE:
 * - Displays tests that the user has ALREADY attempted
 * - Shows result summary (score, percentage)
 * - Prevents re-attempting the same test
 *
 * PROPS:
 * @param {Array} tests       - List of attempted test objects
 * @param {Object} resultsMap - Map of testId → result data
 */
const AttemptedTests = ({ tests, resultsMap }) => {
  return (
    <div>
      {/* ================= SECTION TITLE ================= */}
      <h2 className="text-xl font-semibold mb-4">
        📊 Attempted Tests
      </h2>

      {/* ================= EMPTY STATE =================
          Shown when user has not attempted any tests */}
      {tests.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">
            You haven’t attempted any tests yet.
          </p>
        </div>
      ) : (
        /* ================= ATTEMPTED TESTS GRID ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => {
            // Fetch result data for this specific test
            const result = resultsMap[test.id];

            return (
              <TestCard
                key={test.id}
                test={test}
                leftBorder // Visual indicator that test is completed
              >
                {/* ================= RESULT SUMMARY ================= */}
                <div className="text-sm text-gray-700 mb-4">
                  <p>
                    Score:{" "}
                    <span className="font-semibold">
                      {result?.score} / {result?.totalQuestions}
                    </span>
                  </p>

                  {/* Percentage may not exist for legacy results */}
                  {result?.percentage !== undefined && (
                    <p>
                      Percentage:{" "}
                      <span className="font-semibold">
                        {result.percentage}%
                      </span>
                    </p>
                  )}
                </div>

                {/* ================= ACTION BUTTON =================
                    Disabled because test is already attempted */}
                <button
                  disabled
                  className="w-full py-2 rounded-lg bg-gray-400 text-white cursor-not-allowed"
                >
                  Attempted
                </button>
              </TestCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AttemptedTests;
