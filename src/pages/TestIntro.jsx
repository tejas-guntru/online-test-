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
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-sm text-white/60">
          Loading test details…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 flex items-center justify-center">
      <div
        className="
          max-w-2xl w-full
          rounded-xl p-8
          bg-black/40
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          space-y-6
        "
      >
        {/* ================= TITLE ================= */}
        <h1 className="text-2xl font-semibold text-white/90">
          {test.title}
        </h1>

        {/* ================= DESCRIPTION ================= */}
        <p className="text-white/65 leading-relaxed">
          {test.description || "No description provided for this test."}
        </p>

        {/* ================= INFO BOX ================= */}
        <div className="grid grid-cols-2 gap-4 rounded-lg p-4 bg-black/30 border border-white/5 text-sm">
          <div>
            <p className="text-white/45">Duration</p>
            <p className="text-white/85 font-medium">
              {test.duration} minutes
            </p>
          </div>

          <div>
            <p className="text-white/45">Questions</p>
            <p className="text-white/85 font-medium">
              {test.totalQuestions}
            </p>
          </div>
        </div>

        {/* ================= RULES ================= */}
        <div className="border-t border-white/5 pt-4 space-y-2 text-sm text-white/55">
          <p>• Once started, the test cannot be paused</p>
          <p>• Navigation back is disabled</p>
          <p>• The test auto-submits when time ends</p>
          <p>• Do not refresh or close the tab</p>
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => navigate(`/test/${testId}`)}
            className="
              px-6 py-3 rounded-md
              text-sm font-semibold
              bg-transparent
              border border-white/10
              text-white/85
              transition-all duration-200
              hover:border-cyan-400
              hover:text-cyan-300
              hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
            "
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestIntro;
