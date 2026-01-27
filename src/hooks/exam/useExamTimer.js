import { useCallback } from "react";
import useTestTimer from "../useTestTimer";

/**
 * useExamTimer
 *
 * SAFE: always calls hooks in same order
 */
const useExamTimer = ({
  hasStarted,
  isSubmitting,
  durationMinutes,
  answers,
  onTimeoutSubmit,
}) => {
  const handleTimeout = useCallback(() => {
    if (!isSubmitting && hasStarted) {
      onTimeoutSubmit(answers);
    }
  }, [isSubmitting, hasStarted, onTimeoutSubmit, answers]);

  // ✅ ALWAYS call the hook
  const timeLeft = useTestTimer(
    hasStarted ? durationMinutes : null,
    handleTimeout
  );

  return {
    timeLeft: hasStarted ? timeLeft : null,
  };
};

export default useExamTimer;
