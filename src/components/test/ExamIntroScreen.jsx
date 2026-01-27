import React, { useEffect, useState } from "react";

/**
 * ExamIntroScreen
 *
 * Proper exam-style intro screen.
 * - Explains rules clearly
 * - Requires fullscreen before starting
 * - Gives visual feedback
 *
 * PURE UI (no submission logic)
 */
const ExamIntroScreen = ({
  title,
  description,
  duration,
  totalQuestions,
  onStart,
  onCancel,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(
    Boolean(document.fullscreenElement)
  );

  /* ================= FULLSCREEN STATE TRACK ================= */
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, []);

  /* ================= REQUEST FULLSCREEN ================= */
  const requestFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      alert("Please allow fullscreen to start the exam.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div
        className="
          max-w-2xl w-full
          rounded-2xl p-8
          bg-black/40
          border border-white/10
          shadow-[0_30px_60px_rgba(0,0,0,0.7)]
          space-y-6
        "
      >
        {/* ================= TITLE ================= */}
        <h1 className="text-2xl font-semibold text-white/95">
          {title}
        </h1>

        {/* ================= DESCRIPTION ================= */}
        <p className="text-white/65 leading-relaxed">
          {description || "Please read the instructions carefully before starting the exam."}
        </p>

        {/* ================= EXAM INFO ================= */}
        <div className="grid grid-cols-2 gap-4 rounded-lg p-4 bg-black/30 border border-white/10 text-sm">
          <div>
            <p className="text-white/45">Duration</p>
            <p className="text-white/85 font-medium">
              {duration} minutes
            </p>
          </div>

          <div>
            <p className="text-white/45">Questions</p>
            <p className="text-white/85 font-medium">
              {totalQuestions}
            </p>
          </div>
        </div>

        {/* ================= RULES ================= */}
        <div className="space-y-2 text-sm text-white/60">
          <p>• This exam must be taken in fullscreen mode</p>
          <p>• Leaving fullscreen may auto-submit your exam</p>
          <p>• Navigation back is disabled once the exam starts</p>
          <p>• The exam auto-submits when time expires</p>
        </div>

        {/* ================= FULLSCREEN STATUS ================= */}
        <div
          className={`
            flex items-center justify-between
            rounded-lg px-4 py-3
            border text-sm
            ${
              isFullscreen
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                : "border-orange-400/40 bg-orange-400/10 text-orange-300"
            }
          `}
        >
          <span>
            {isFullscreen
              ? "✔ Fullscreen enabled"
              : "⚠ Fullscreen required to start"}
          </span>

          {!isFullscreen && (
            <button
              onClick={requestFullscreen}
              className="
                px-3 py-1.5 rounded-md
                border border-white/10
                text-white/85
                hover:border-cyan-400
                hover:text-cyan-300
                transition
              "
            >
              Enter Fullscreen
            </button>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="
              px-5 py-2 rounded-md
              bg-white/5
              text-white/70
              hover:bg-white/10
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onStart}
            disabled={!isFullscreen}
            className="
              px-6 py-2 rounded-md
              border border-white/10
              text-white/85
              transition-all
              hover:border-cyan-400
              hover:text-cyan-300
              hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamIntroScreen;
