import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/* Split hooks */
import useExamCore from "./useExamCore";
import useExamShuffle from "./useExamShuffle";
import useExamPersistence from "./useExamPersistence";
import useExamTimer from "./useExamTimer";
import useExamAntiCheat from "./useExamAntiCheat";

/**
 * useExamState (COMPOSER)
 *
 * - Orchestrates all exam logic
 * - Contains almost no business logic itself
 */
const useExamState = ({ test, questions, testId }) => {
  const navigate = useNavigate();

  /* ================= SHUFFLE ================= */
  const { shuffleOnce } = useExamShuffle(questions);

  /* ================= CORE ================= */
  const core = useExamCore({ test, testId });

  /* ================= SHUFFLED QUESTIONS ================= */
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  /* ================= START EXAM ================= */
  const startExam = () => {
    if (core.hasStarted) return;
    setShuffledQuestions(shuffleOnce());
    core.startExam();
  };

  /* ================= PERSISTENCE ================= */
  useExamPersistence({
    testId,
    hasStarted: core.hasStarted,
    isSubmitting: core.isSubmitting,

    answers: core.answers,
    currentIndex: core.currentIndex,
    shuffledQuestions,

    setAnswers: core.setAnswers,
    setCurrentIndex: core.setCurrentIndex,
    setShuffledQuestions,
    setHasStarted: core.startExam,
  });

  /* ================= TIMER ================= */
  const { timeLeft } = useExamTimer({
    hasStarted: core.hasStarted,
    isSubmitting: core.isSubmitting,
    durationMinutes:
      core.hasStarted && test?.duration != null
        ? Number(test.duration)
        : null,
    answers: core.answers,
    onTimeoutSubmit: core.submitExam,
  });

  /* ================= ANTI-CHEAT ================= */
  useExamAntiCheat({
    hasStarted: core.hasStarted,
    isSubmitting: core.isSubmitting,
    onAutoSubmit: () =>
      core.submitExam(shuffledQuestions, core.answers),
  });

  /* ================= NEXT ================= */
  const next = () => {
    core.nextQuestion(shuffledQuestions);
  };

  /* ================= NULL SAFE ================= */
  if (!test || questions.length === 0) {
    return {
      hasStarted: false,
      isSubmitting: false,
      showLeaveModal: false,
      currentIndex: 0,
      currentQuestion: null,
      selectedOption: null,
      timeLeft: null,
      startExam: () => {},
      cancelExam: () => {},
      selectOption: () => {},
      next: () => {},
      stayInExam: () => {},
      leaveExam: () => {},
      totalQuestions: 0,
      isLastQuestion: false,
      totalDuration: 0,
      testTitle: "",
    };
  }

  /* ================= RETURN ================= */
  return {
    hasStarted: core.hasStarted,
    isSubmitting: core.isSubmitting,

    currentIndex: core.currentIndex,
    currentQuestion: shuffledQuestions[core.currentIndex] || null,
    selectedOption: core.selectedOption,
    timeLeft,

    startExam,
    cancelExam: () => navigate("/dashboard"),
    selectOption: core.setSelectedOption,
    next,

    stayInExam: () => {},
    leaveExam: () =>
      core.submitExam(shuffledQuestions, core.answers),

    totalQuestions: shuffledQuestions.length,
    isLastQuestion:
      core.currentIndex === shuffledQuestions.length - 1,
    totalDuration: test.duration * 60,
    testTitle: test.title,
  };
};

export default useExamState;
