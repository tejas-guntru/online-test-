import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/**
 * submitTestResult
 *
 * Saves test attempt result to Firestore.
 *
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.testId
 * @param {number} params.score
 * @param {number} params.total
 * @param {number} params.percentage
 * @param {string|null} params.certificateEarned
 */
const submitTestResult = async ({
  userId,
  testId,
  score,
  total,
  percentage,
  certificateEarned,
}) => {
  return await addDoc(collection(db, "results"), {
    userId,
    testId,
    score,
    total,
    percentage,

    certificateEarned, // completion | merit | excellence | null
    certificateStatus: certificateEarned ? "available" : "none",

    submittedAt: serverTimestamp(),
  });
};

export default submitTestResult;
