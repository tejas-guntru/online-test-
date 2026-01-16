// ==================== REACT ====================
import { useEffect, useState } from "react";

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
 *
 * COLLECTION:
 * - retake_requests/{resultId}
 *
 * NOTE:
 * - Admin may approve (delete result)
 * - Admin may reject (request deleted)
 */
const RetakeRequestButton = ({ result, user }) => {
  /**
   * EXPECTED PROPS:
   * result → test result object
   * user   → logged-in user object (name, email)
   */

  const [status, setStatus] = useState(null); // null | pending
  const [loading, setLoading] = useState(true);

  // Stable document reference
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
        // Core references
        resultId: result.id,
        testId: result.testId,
        userId: result.userId,

        // Student identity (for admin UI)
        userName: user?.name || "Unknown",
        userEmail: user?.email || "Unknown",

        // Original attempt data
        originalScore: result.score,
        originalTotal: result.total,
        originalPercentage: (
          (result.score / result.total) *
          100
        ).toFixed(2),

        // Request metadata
        status: "pending",
        requestedAt: serverTimestamp(),
      });

      setStatus("pending");
    } catch (err) {
      console.error("Try Again request failed:", err);
      alert("Failed to request Try Again. Please try later.");
    }
  };

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <p className="text-sm text-gray-500 mt-2">
        Checking Try Again status…
      </p>
    );
  }

  // Waiting for admin decision
  if (status === "pending") {
    return (
      <p className="text-sm text-yellow-600 font-semibold mt-2">
        ⏳ Try Again request pending approval
      </p>
    );
  }

  // No request yet (FAILED case)
  return (
    <button
      onClick={requestTryAgain}
      className="mt-3 px-3 py-1.5 text-sm rounded bg-gray-200 hover:bg-gray-300"
    >
      🔁 Try Again
    </button>
  );
};

export default RetakeRequestButton;
