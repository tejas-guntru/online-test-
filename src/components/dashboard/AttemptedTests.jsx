import TestCard from "./TestCard";

const AttemptedTests = ({ tests, resultsMap }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        📊 Attempted Tests
      </h2>

      {tests.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">
            You haven’t attempted any tests yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => {
            const result = resultsMap[test.id];

            return (
              <TestCard
                key={test.id}
                test={test}
                leftBorder
              >
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
