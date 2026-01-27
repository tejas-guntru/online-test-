import { useParams, useNavigate } from "react-router-dom";

/* Hooks */
import useTestLoader from "../hooks/useTestLoader";
import useExamState from "../hooks/exam/useExamState";

/* Components */
import ExamIntroScreen from "../components/test/ExamIntroScreen";
import ExamContainer from "../components/test/ExamContainer";

const Test = () => {
  const { id: testId } = useParams();
  const navigate = useNavigate();

  /**
   * ⚠️ IMPORTANT FLOW
   *
   * 1. First load test normally (attempt check active)
   * 2. Once exam starts OR submitting → disable attempt check
   */

  /* ================= EXAM STATE (ALWAYS FIRST) ================= */
  const exam = useExamState({
    test: null,
    questions: [],
    testId,
  });

  /* ================= LOAD TEST ================= */
  const { test, questions, loading } = useTestLoader(
    testId,
    () => navigate("/dashboard"),
    exam.hasStarted || exam.isSubmitting // 🔥 KEY FIX
  );

  /* ================= SYNC LOADED DATA INTO EXAM ================= */
  // Re-initialize exam state once test/questions arrive
  const syncedExam = useExamState({
    test,
    questions,
    testId,
  });

  /* ================= LOADING ================= */
  if (loading || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-sm text-white/60">Loading test…</p>
      </div>
    );
  }

  /* ================= INTRO SCREEN ================= */
  if (!syncedExam.hasStarted) {
    return (
      <ExamIntroScreen
        title={test.title}
        description={test.description}
        duration={test.duration}
        totalQuestions={questions.length}
        onStart={syncedExam.startExam}
        onCancel={syncedExam.cancelExam}
      />
    );
  }

  /* ================= EXAM UI ================= */
  return (
    <ExamContainer
      testTitle={syncedExam.testTitle}
      timeLeft={syncedExam.timeLeft}
      totalDuration={syncedExam.totalDuration}
      question={syncedExam.currentQuestion}
      questionNumber={syncedExam.currentIndex + 1}
      totalQuestions={syncedExam.totalQuestions}
      selectedOption={syncedExam.selectedOption}
      onSelectOption={syncedExam.selectOption}
      isLastQuestion={syncedExam.isLastQuestion}
      onNext={syncedExam.next}
      submitting={syncedExam.isSubmitting}
      showLeaveModal={syncedExam.showLeaveModal}
      onStay={syncedExam.stayInExam}
      onLeave={syncedExam.leaveExam}
    />
  );
};

export default Test;
