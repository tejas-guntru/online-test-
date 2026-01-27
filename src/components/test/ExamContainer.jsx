import React from "react";

/* Components */
import TestHeader from "./TestHeader";
import QuestionCard from "./QuestionCard";
import TestNavigation from "./TestNavigation";
import LeaveExamModal from "./LeaveExamModal";

/**
 * ExamContainer
 *
 * Pure layout component for the running exam.
 * Handles UI freezing + malpractice warning overlay.
 */
const ExamContainer = ({
  testTitle,
  timeLeft,
  totalDuration,

  question,
  questionNumber,
  totalQuestions,

  selectedOption,
  onSelectOption,

  isLastQuestion,
  onNext,
  submitting,

  showLeaveModal,
  onStay,
  onLeave,

  /* 🚨 MALPRACTICE */
  isFrozen,
  violationMessage,
  onAcknowledgeViolation,
}) => {
  return (
    <div className="min-h-screen bg-[#020617] p-6 relative">

      {/* ================= MAIN EXAM UI ================= */}
      <div
        className={`
          max-w-3xl mx-auto
          rounded-xl p-6
          bg-black/40
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          space-y-6
          ${isFrozen ? "pointer-events-none blur-[1px]" : ""}
        `}
      >
        {/* ===== HEADER ===== */}
        <TestHeader
          title={testTitle}
          timeLeft={timeLeft}
          totalDuration={totalDuration}
        />

        {/* ===== QUESTION ===== */}
        <QuestionCard
          question={question}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          selectedOption={selectedOption}
          onSelectOption={isFrozen ? () => {} : onSelectOption}
        />

        {/* ===== NAVIGATION ===== */}
        <TestNavigation
          isLastQuestion={isLastQuestion}
          onNext={isFrozen ? () => {} : onNext}
          submitting={submitting || isFrozen}
        />
      </div>

      {/* ================= LEAVE MODAL ================= */}
      <LeaveExamModal
        open={showLeaveModal && !isFrozen}
        onStay={onStay}
        onLeave={onLeave}
      />

      {/* ================= MALPRACTICE OVERLAY ================= */}
      {violationMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div
            className="
              max-w-md w-full
              rounded-xl p-6
              bg-[#020617]
              border border-red-500/40
              shadow-[0_0_40px_rgba(239,68,68,0.4)]
              text-white
            "
          >
            <h2 className="text-lg font-semibold text-red-400 mb-3">
              ⚠️ Exam Warning
            </h2>

            <p className="text-sm text-white/80 whitespace-pre-line mb-6">
              {violationMessage}
            </p>

            <button
              onClick={onAcknowledgeViolation}
              className="
                w-full py-2 rounded-md
                bg-red-600
                hover:bg-red-700
                text-white font-semibold
                transition
              "
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamContainer;
