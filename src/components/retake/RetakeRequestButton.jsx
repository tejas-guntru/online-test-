// ==================== REACT ====================
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ==================== FIREBASE ====================
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * RetakeRequestButton
 *
 * PURPOSE:
 * - Allows a student to request a "Try Again" for a failed test
 * - Creates a retake request linked to resultId
 * - Displays current request status
 */
const RetakeRequestButton = ({ result, user }) => {
  const [status, setStatus] = useState(null); // null | pending
  const [loading, setLoading] = useState(true);

  const requestRef = doc(db, "retake_requests", result.id);

  /* ================= LOAD REQUEST STATUS ================= */
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const snap = await getDoc(requestRef);
        if (snap.exists()) {
          setStatus(snap.data().status);
        }
      } catch (err) {
        console.error("Failed to load Try Again status:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [requestRef]);

  /* ================= REQUEST TRY AGAIN ================= */
  const requestTryAgain = async () => {
    try {
      await setDoc(requestRef, {
        resultId: result.id,
        testId: result.testId,
        userId: result.userId,

        userName: user?.name || "Unknown",
        userEmail: user?.email || "Unknown",

        originalScore: result.score,
        originalTotal: result.total,
        originalPercentage: (
          (result.score / result.total) *
          100
        ).toFixed(2),

        status: "pending",
        requestedAt: serverTimestamp(),
      });

      setStatus("pending");
    } catch (err) {
      console.error("Try Again request failed:", err);
    }
  };

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-white/50 mt-2"
      >
        Checking retry eligibility…
      </motion.p>
    );
  }

  // Waiting for admin decision
  if (status === "pending") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-sm text-amber-400/90 font-medium mt-2"
      >
        ⏳ Try Again request pending approval
      </motion.p>
    );
  }

  // No request yet (FAILED case)
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      onClick={requestTryAgain}
      className="
        mt-3
        inline-flex items-center gap-2
        px-3 py-1.5
        text-sm font-medium
        rounded-md
        bg-transparent
        border border-white/10
        text-white/70
        hover:border-cyan-400/60
        hover:text-cyan-300
      "
    >
      🔁 Try Again
    </motion.button>
  );
};

export default RetakeRequestButton;
