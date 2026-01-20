import TestCard from "./TestCard";

/**
 * AttemptedTests Component
 *
 * PURPOSE:
 * - Renders ONLY attempted test cards
 * - No page titles
 * - No summaries
 * - Just the list
 */
const AttemptedTests = ({ tests, resultsMap }) => {
  if (tests.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        You haven’t attempted any tests yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tests.map((test) => {
        const result = resultsMap[test.id];

        return (
          <TestCard
            key={test.id}
            test={test}
            leftBorder
          >
            {/* ================= RESULT SUMMARY ================= */}
            <div className="text-sm text-gray-700 mb-4">
              <p>
                Score:{" "}
                <span className="font-semibold">
                  {result?.score} /{" "}
                  {result?.totalQuestions}
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

            {/* ================= STATUS ================= */}
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
  );
};

export default AttemptedTests;
