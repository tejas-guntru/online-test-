// TestCard → Reusable card component used to display test details
import TestCard from "./TestCard";

/**
 * AvailableTests Component
 *
 * PURPOSE:
 * - Displays tests that the user has NOT attempted yet
 * - Allows user to start a test
 */
const AvailableTests = ({ tests, onStart }) => {
  return (
    <div className="mb-10">
      {/* ================= SECTION TITLE ================= */}
      <h2 className="text-xl font-semibold mb-4">
        🟢 Available Tests
      </h2>

      {/* ================= EMPTY STATE ================= */}
      {tests.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">
            No available tests.
          </p>
        </div>
      ) : (
        /* ================= AVAILABLE TESTS GRID ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => {
            // 🔍 DEBUG (REMOVE LATER)
            console.log("Available test →", {
              id: test.id,
              previewImage: test.previewImage,
            });

            return (
              <TestCard
                key={test.id}
                test={{
                  ...test,
                  // ✅ FORCE explicit pass (bulletproof)
                  previewImage: test.previewImage || null,
                }}
              >
                {/* ================= TEST META ================= */}
                <p className="text-sm text-gray-500 mb-4">
                  ⏱ {test.duration} minutes
                </p>

                {/* ================= START ACTION ================= */}
                <button
                  onClick={() => onStart(test.id)}
                  className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                >
                  Start Test
                </button>
              </TestCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AvailableTests;
