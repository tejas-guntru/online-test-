import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

/**
 * useTestLoader
 *
 * Loads:
 * - Test metadata
 * - Questions linked to the test
 *
 * Guards:
 * - Blocks user if test already attempted (ONLY before start)
 *
 * @param {string} testId
 * @param {function} onErrorRedirect
 * @param {boolean} skipAttemptCheck
 */
const useTestLoader = (
  testId,
  onErrorRedirect,
  skipAttemptCheck = false
) => {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!testId || !auth.currentUser) return;

    const loadTest = async () => {
      try {
        /* ================= CHECK ALREADY ATTEMPTED ================= */
        if (!skipAttemptCheck) {
          const attemptQuery = query(
            collection(db, "results"),
            where("userId", "==", auth.currentUser.uid),
            where("testId", "==", testId),
            limit(1)
          );

          const attemptSnap = await getDocs(attemptQuery);

          if (!attemptSnap.empty) {
            if (onErrorRedirect) onErrorRedirect();
            return;
          }
        }

        /* ================= FETCH TEST ================= */
        const testRef = doc(db, "tests", testId);
        const testSnap = await getDoc(testRef);

        if (!testSnap.exists()) {
          alert("Test not found");
          if (onErrorRedirect) onErrorRedirect();
          return;
        }

        const testData = testSnap.data();

        if (testData.isActive === false) {
          alert("This test is no longer active.");
          if (onErrorRedirect) onErrorRedirect();
          return;
        }

        setTest(testData);

        /* ================= FETCH QUESTIONS ================= */
        const q = query(
          collection(db, "questions"),
          where("testId", "==", testId)
        );

        const qsnap = await getDocs(q);

        if (qsnap.empty) {
          alert("No questions found for this test.");
          if (onErrorRedirect) onErrorRedirect();
          return;
        }

        const questionList = qsnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setQuestions(questionList);
        setLoading(false);
      } catch (error) {
        console.error("Error loading test:", error);
        alert("Failed to load test");
        if (onErrorRedirect) onErrorRedirect();
      }
    };

    loadTest();
  }, [testId, onErrorRedirect, skipAttemptCheck]);

  return {
    test,
    questions,
    loading,
  };
};

export default useTestLoader;
