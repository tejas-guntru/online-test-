import TestCard from "./TestCard";

const TestGrid = ({ tests, attemptCounts, onToggle, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tests.map((test) => (
        <div
          key={test.id}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-1">
            {test.title}
          </h3>

          <p className="text-sm text-gray-600 mb-2">
            {test.description || "No description"}
          </p>

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

          <div className="flex gap-2">
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
