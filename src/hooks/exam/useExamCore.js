import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import calculateScore from "../../utils/calculateScore";
import submitTestResult from "../../utils/submitTestResult";
import { decideCertificate } from "../../utils/certificateDecision";

/**
 * useExamCore
 *
 * Responsibilities:
 * - Start exam
 * - Track current question
 * - Track selected option
 * - Convert shuffled option → original index
 * - Submit exam + navigate to result
 *
 * ❌ Does NOT:
 * - Shuffle questions
 * - Handle timers
 * - Handle anti-cheat
 * - Handle persistence
 */
const useExamCore = ({ test, testId }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null); 
  // { value, shuffledIndex }
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= START ================= */
  const startExam = () => {
    if (hasStarted) return;
    setHasStarted(true);
  };

  /* ================= NEXT ================= */
  const nextQuestion = (shuffledQuestions) => {
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    const question = shuffledQuestions[currentIndex];

    // 🔥 Convert shuffled option → ORIGINAL index
    const originalIndex = question.options.indexOf(
      selectedOption.value
    );

    const updatedAnswers = {
      ...answers,
      [question.id]: originalIndex,
    };

    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex === shuffledQuestions.length - 1) {
      submitExam(shuffledQuestions, updatedAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  /* ================= SUBMIT ================= */
  const submitExam = useCallback(
    async (shuffledQuestions, finalAnswers) => {
      if (isSubmitting || !test) return;

      setIsSubmitting(true);

      try {
        const { score, total, percentage } = calculateScore(
          shuffledQuestions,
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

        navigate("/result", { replace: true });
      } catch (err) {
        console.error("Submit failed:", err);
        setIsSubmitting(false);
      }
    },
    [isSubmitting, test, testId, navigate]
  );

  return {
    /* state */
    hasStarted,
    currentIndex,
    answers,
    selectedOption,
    isSubmitting,

    /* actions */
    startExam,
    setSelectedOption,
    nextQuestion,
    submitExam,
  };
};

export default useExamCore;
