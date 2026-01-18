import { useEffect, useRef, useState } from "react";

const useTestTimer = (durationMinutes, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const timeoutRef = useRef(onTimeout);

  // 🔄 Always keep latest onTimeout
  useEffect(() => {
    timeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (durationMinutes === null || Number.isNaN(durationMinutes)) {
      return;
    }

    let seconds = durationMinutes * 60;
    setTimeLeft(seconds);

    const interval = setInterval(() => {
      seconds -= 1;
      setTimeLeft(seconds);

      if (seconds <= 0) {
        clearInterval(interval);
        timeoutRef.current?.(); // ✅ always latest
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [durationMinutes]);

  return timeLeft ?? 0;
};

export default useTestTimer;
