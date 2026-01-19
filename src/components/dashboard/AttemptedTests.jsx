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
 */
const AttemptedTests = ({ tests, resultsMap }) => {
  return (
    <div>
      {/* ================= SECTION TITLE ================= */}
      <h2 className="text-xl font-semibold mb-4">
        📊 Attempted Tests
      </h2>

      {/* ================= EMPTY STATE ================= */}
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
            const result = resultsMap[test.id];

            // 🔍 DEBUG (remove later if you want)
            console.log("Attempted test →", {
              id: test.id,
              previewImage: test.previewImage,
            });

            return (
              <TestCard
                key={test.id}
                leftBorder
                test={{
                  ...test,
                  // ✅ EXPLICIT pass (same as AvailableTests)
                  previewImage: test.previewImage || null,
                }}
              >
                {/* ================= RESULT SUMMARY ================= */}
                <div className="text-sm text-gray-700 mb-4">
                  <p>
                    Score:{" "}
                    <span className="font-semibold">
                      {result?.score} / {result?.totalQuestions}
                    </span>
                  </p>

                  {result?.percentage !== undefined && (
                    <p>
                      Percentage:{" "}
                      <span className="font-semibold">
                        {result.percentage}%
                      </span>
                    </p>
                  )}
                </div>

                {/* ================= ACTION ================= */}
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
