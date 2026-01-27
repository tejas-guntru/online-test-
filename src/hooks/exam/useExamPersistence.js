import { useEffect } from "react";

/**
 * useExamPersistence
 *
 * Responsibilities:
 * - Restore exam progress from localStorage
 * - Persist exam progress during the exam
 *
 * ❌ Does NOT:
 * - Control exam flow
 * - Handle submit
 * - Handle shuffle
 * - Handle navigation
 */
const useExamPersistence = ({
  testId,
  hasStarted,
  isSubmitting,

  /* state */
  answers,
  currentIndex,
  shuffledQuestions,

  /* setters */
  setAnswers,
  setCurrentIndex,
  setShuffledQuestions,
  setHasStarted,
}) => {
  /* ================= RESTORE ================= */
  useEffect(() => {
    if (!testId || hasStarted) return;

    const saved = localStorage.getItem(`test_${testId}_progress`);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setAnswers(parsed.answers || {});
      setCurrentIndex(parsed.currentIndex || 0);
      setShuffledQuestions(parsed.shuffledQuestions || []);
      setHasStarted(true);
    } catch {
      localStorage.removeItem(`test_${testId}_progress`);
    }
  }, [
    testId,
    hasStarted,
    setAnswers,
    setCurrentIndex,
    setShuffledQuestions,
    setHasStarted,
  ]);

  /* ================= SAVE ================= */
  useEffect(() => {
    if (!hasStarted || isSubmitting) return;

    localStorage.setItem(
      `test_${testId}_progress`,
      JSON.stringify({
        answers,
        currentIndex,
        shuffledQuestions,
      })
    );
  }, [
    testId,
    hasStarted,
    isSubmitting,
    answers,
    currentIndex,
    shuffledQuestions,
  ]);
};

export default useExamPersistence;
