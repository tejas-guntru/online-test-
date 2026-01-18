import { useNavigate, useParams } from "react-router-dom";
import useTestLoader from "../hooks/useTestLoader";

const TestIntro = () => {
  const { id: testId } = useParams();
  const navigate = useNavigate();

  const { test, loading } = useTestLoader(
    testId,
    () => navigate("/dashboard")
  );

  if (loading || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading test details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          {test.title}
        </h1>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">
          {test.description || "No description provided for this test."}
        </p>

        {/* Info Box */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
          <div>
            <span className="text-gray-500">Duration</span>
            <p className="font-semibold">
              {test.duration} minutes
            </p>
          </div>

          <div>
            <span className="text-gray-500">Questions</span>
            <p className="font-semibold">
              {test.totalQuestions}
            </p>
          </div>
        </div>

        {/* Rules */}
        <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
          <p>• Once started, the test cannot be paused</p>
          <p>• Navigation back is disabled</p>
          <p>• The test auto-submits when time ends</p>
          <p>• Do not refresh or close the tab</p>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/test/${testId}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Exam
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestIntro;
