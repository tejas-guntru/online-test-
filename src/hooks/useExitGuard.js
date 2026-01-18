import { useEffect } from "react";

const useExitGuard = (enabled, onAttemptLeave) => {
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for browser
      onAttemptLeave?.();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, onAttemptLeave]);
};

export default useExitGuard;
