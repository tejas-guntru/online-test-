import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

/* Hooks */
import useTestLoader from "../hooks/useTestLoader";
import useTestTimer from "../hooks/useTestTimer";
import useExitGuard from "../hooks/useExitGuard";
import useKeyboardSubmit from "../hooks/useKeyboardSubmit";
import useBlockBackNavigation from "../hooks/useBlockBackNavigation";

/* Components */
import TestHeader from "../components/test/TestHeader";
import QuestionCard from "../components/test/QuestionCard";
import TestNavigation from "../components/test/TestNavigation";
import LeaveExamModal from "../components/test/LeaveExamModal";

/* Utils */
import calculateScore from "../utils/calculateScore";
import submitTestResult from "../utils/submitTestResult";
import { decideCertificate } from "../utils/certificateDecision";

const Test = () => {
  const { id: testId } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  /* ================= LOAD TEST ================= */
  const { test, questions, loading } = useTestLoader(
    testId,
    () => navigate("/dashboard")
  );

  /* ================= SUBMIT ================= */
  const handleSubmit = useCallback(
    async (finalAnswers, isAutoSubmit = false) => {
      if (isSubmitting) return;
      if (!test || questions.length === 0) return;

      if (!isAutoSubmit && Object.keys(finalAnswers).length === 0) {
        alert("You did not answer any questions.");
        return;
      }

      setIsSubmitting(true);

      try {
        const { score, total, percentage } = calculateScore(
          questions,
          finalAnswers
        );

        const certificateEarned = test.certificate
          ? decideCertificate({
              percentage,
              certificateConfig: test.certificate,
            })
          : null;

        await submitTestResult({
          userId: auth.currentUser.uid,
          testId,
          score,
          total,
          percentage,
          certificateEarned,
        });

        navigate("/result", {
          replace: true,
          state: { score, total, percentage, certificateEarned },
        });
      } catch (err) {
        console.error("Submit failed:", err);
        setIsSubmitting(false);
      }
    },
    [isSubmitting, test, questions, testId, navigate]
  );

  /* ================= TIMER ================= */
  const durationMinutes =
    hasStarted && test?.duration != null
      ? Number(test.duration)
      : null;

  const handleTimeout = useCallback(() => {
    handleSubmit(answers, true);
  }, [handleSubmit, answers]);

  const timeLeft = useTestTimer(durationMinutes, handleTimeout);

  /* ================= EXAM LOCKS ================= */
  useExitGuard(hasStarted && !isSubmitting, () =>
    setShowLeaveModal(true)
  );
  useBlockBackNavigation(hasStarted && !isSubmitting);

  /* ================= CURRENT QUESTION ================= */
  const currentQuestion = questions[currentIndex];

  /* ================= NEXT ================= */
  const handleNext = () => {
    if (selectedOption === null) {
      alert("Please select an option");
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOption,
    };

    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex === questions.length - 1) {
      handleSubmit(updatedAnswers, false);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  useKeyboardSubmit(handleNext, hasStarted && !isSubmitting);

  /* ================= LOADING ================= */
  if (loading || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-sm text-white/60">
          Loading test…
        </p>
      </div>
    );
  }

  /* ================= CONFIRMATION SCREEN ================= */
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
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
          <h1 className="text-2xl font-semibold text-white/90">
            {test.title}
          </h1>

          <p className="text-white/65">
            {test.description ||
              "No description provided for this test."}
          </p>

          <div className="rounded-lg p-4 bg-black/30 border border-white/5 text-sm text-white/60 space-y-1">
            <p>• Duration: {test.duration} minutes</p>
            <p>• Total Questions: {questions.length}</p>
            <p>• Once started, you cannot go back</p>
            <p>• Leaving will submit your exam</p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/dashboard")}
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
              onClick={() => setHasStarted(true)}
              className="
                px-6 py-2 rounded-md
                border border-white/10
                text-white/85
                transition-all
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
  }

  /* ================= EXAM UI ================= */
  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div
        className="
          max-w-3xl mx-auto
          rounded-xl p-6
          bg-black/40
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          space-y-6
        "
      >
        <TestHeader
          title={test.title}
          timeLeft={timeLeft}
          totalDuration={test.duration * 60}
        />

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
        />

        <TestNavigation
          isLastQuestion={currentIndex === questions.length - 1}
          onNext={handleNext}
          submitting={isSubmitting}
        />
      </div>

      {/* ===== LEAVE EXAM MODAL ===== */}
      <LeaveExamModal
        open={showLeaveModal}
        onStay={() => setShowLeaveModal(false)}
        onLeave={() => handleSubmit(answers, true)}
      />
    </div>
  );
};

export default Test;
