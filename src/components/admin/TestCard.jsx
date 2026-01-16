const TestCard = ({ test, onToggle, onEdit }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">
          {test.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            test.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {test.isActive ? "Active" : "Revoked"}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {test.description || "No description"}
      </p>

      <div className="mt-4 text-sm text-gray-600">
        ⏱ {test.duration} mins  
        <br />
        ❓ {test.totalQuestions} questions
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => onEdit(test)}
          className="flex-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Edit
        </button>

        <button
          onClick={() => onToggle(test.id, test.isActive)}
          className={`flex-1 px-3 py-2 rounded text-white ${
            test.isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {test.isActive ? "Revoke" : "Activate"}
        </button>
      </div>
    </div>
  );
};

export default TestCard;
