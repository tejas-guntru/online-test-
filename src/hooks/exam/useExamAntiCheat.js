import { useEffect, useRef, useCallback } from "react";

/**
 * useExamAntiCheat
 *
 * Responsibilities:
 * - Track malpractice violations
 * - Detect fullscreen exit
 * - Detect tab switch / window blur
 *
 * ❌ Does NOT:
 * - Submit exam
 * - Show UI
 * - Navigate
 */
const useExamAntiCheat = ({
  hasStarted,
  isSubmitting,
  onAutoSubmit,
  maxViolations = 3,
}) => {
  const violationCount = useRef(0);

  const registerViolation = useCallback(
    (reason) => {
      if (!hasStarted || isSubmitting) return;

      violationCount.current += 1;

      if (violationCount.current <= maxViolations) {
        alert(
          `⚠️ Malpractice detected (${violationCount.current}/${maxViolations})\n\nReason: ${reason}`
        );
      }

      if (violationCount.current > maxViolations) {
        alert("❌ Exam terminated due to repeated malpractice.");
        onAutoSubmit();
      }
    },
    [hasStarted, isSubmitting, maxViolations, onAutoSubmit]
  );

  /* ================= FULLSCREEN ================= */
  useEffect(() => {
    const onFullscreenChange = () => {
      if (
        hasStarted &&
        !document.fullscreenElement &&
        !isSubmitting
      ) {
        registerViolation("Exited fullscreen mode");
      }
    };

    document.addEventListener(
      "fullscreenchange",
      onFullscreenChange
    );
    return () =>
      document.removeEventListener(
        "fullscreenchange",
        onFullscreenChange
      );
  }, [hasStarted, isSubmitting, registerViolation]);

  /* ================= TAB / WINDOW SWITCH ================= */
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        registerViolation("Switched browser tab");
      }
    };

    const onBlur = () => {
      registerViolation("Browser window lost focus");
    };

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
      window.removeEventListener("blur", onBlur);
    };
  }, [registerViolation]);

  return {
    violationCount,
    registerViolation,
  };
};

export default useExamAntiCheat;
