import { useState } from "react";
import EditTestModal from "./EditTestModal";

const TestList = ({
  tests,
  attemptCounts,
  onToggle,
  onUpdate,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Attempts</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tests.map((test) => (
            <tr
              key={test.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">
                {test.title}
              </td>

              <td className="px-4 py-3">
                {test.duration} mins
              </td>

              <td className="px-4 py-3">
                <span className="font-semibold">
                  {attemptCounts[test.id] || 0}
                </span>
              </td>

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

              <td className="px-4 py-3">
                <div className="flex gap-2">
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
