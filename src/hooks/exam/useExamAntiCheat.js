import { useEffect, useRef, useCallback } from "react";

/**
 * useExamAntiCheat (FINAL – MOBILE SAFE)
 *
 * Desktop:
 * - Fullscreen enforcement
 * - Blur / tab switch detection
 * - Resize / split-screen detection
 *
 * Mobile:
 * - App switch / screen lock detection
 * - Orientation change detection
 *
 * Protections:
 * - Cooldown to prevent double violations
 * - Auto-submit locked to once
 */
const useExamAntiCheat = ({
  hasStarted,
  isSubmitting,
  onAutoSubmit,
  maxViolations = 3,
}) => {
  const violationCount = useRef(0);
  const lastViolationTime = useRef(0);
  const isLocked = useRef(false);

  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* ================= REGISTER VIOLATION ================= */
  const registerViolation = useCallback(
    (reason) => {
      if (!hasStarted || isSubmitting || isLocked.current) return;

      // ⏱ Prevent double-counting (blur + visibility)
      const now = Date.now();
      if (now - lastViolationTime.current < 1500) return;
      lastViolationTime.current = now;

      violationCount.current += 1;

      if (violationCount.current <= maxViolations) {
        alert(
          `⚠️ Exam Warning (${violationCount.current}/${maxViolations})\n\n${reason}`
        );
      }

      if (violationCount.current > maxViolations) {
        isLocked.current = true;
        alert("❌ Exam auto-submitted due to repeated violations.");
        onAutoSubmit();
      }
    },
    [hasStarted, isSubmitting, maxViolations, onAutoSubmit]
  );

  /* ================= VISIBILITY (DESKTOP + MOBILE) ================= */
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        registerViolation(
          "App switched, screen locked, or tab changed"
        );
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );
    return () =>
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
  }, [registerViolation]);

  /* ================= WINDOW BLUR (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (isMobile) return;

    const onBlur = () => {
      registerViolation("Browser window lost focus");
    };

    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [registerViolation, isMobile]);

  /* ================= FULLSCREEN (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (isMobile) return;

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
  }, [hasStarted, isSubmitting, registerViolation, isMobile]);

  /* ================= ORIENTATION CHANGE (MOBILE ONLY) ================= */
  useEffect(() => {
    if (!isMobile) return;

    const onOrientationChange = () => {
      registerViolation("Device orientation changed");
    };

    window.addEventListener(
      "orientationchange",
      onOrientationChange
    );
    return () =>
      window.removeEventListener(
        "orientationchange",
        onOrientationChange
      );
  }, [registerViolation, isMobile]);

  /* ================= RESIZE / SPLIT SCREEN (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (isMobile) return; // 🚫 ignore resize on mobile

    const onResize = () => {
      registerViolation("Screen resized or split view detected");
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [registerViolation, isMobile]);

  return {
    violationCount,
    registerViolation,
    isMobile,
  };
};

export default useExamAntiCheat;
