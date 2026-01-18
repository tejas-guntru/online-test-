import { useEffect } from "react";

const useBlockBackNavigation = (enabled) => {
  useEffect(() => {
    if (!enabled) return;

    // Push current state to prevent going back
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Immediately push state again
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled]);
};

export default useBlockBackNavigation;
