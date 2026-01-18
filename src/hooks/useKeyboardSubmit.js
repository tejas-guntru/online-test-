import { useEffect } from "react";

/**
 * useKeyboardSubmit
 *
 * Triggers an action when Enter key is pressed.
 *
 * @param {function} onEnterPress
 * @param {boolean} enabled
 */
const useKeyboardSubmit = (onEnterPress, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onEnterPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEnterPress, enabled]);
};

export default useKeyboardSubmit;
