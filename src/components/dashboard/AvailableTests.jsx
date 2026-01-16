import TestCard from "./TestCard";

const AvailableTests = ({ tests, onStart }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">
        🟢 Available Tests
      </h2>

      {tests.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">
            No available tests.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <TestCard key={test.id} test={test}>
              <p className="text-sm text-gray-500 mb-4">
                ⏱ {test.duration} minutes
              </p>

              <button
                onClick={() => onStart(test.id)}
                className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                Start Test
              </button>
            </TestCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTests;
