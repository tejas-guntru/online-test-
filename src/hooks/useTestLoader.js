import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * useTestLoader
 *
 * Loads:
 * - Test metadata (title, duration, certificate config)
 * - Questions linked to the test
 *
 * @param {string} testId
 * @param {function} onErrorRedirect (optional)
 */
const useTestLoader = (testId, onErrorRedirect) => {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!testId) return;

    const loadTest = async () => {
      try {
        /* ===== Fetch test document ===== */
        const testRef = doc(db, "tests", testId);
        const testSnap = await getDoc(testRef);

        if (!testSnap.exists()) {
          alert("Test not found");
          if (onErrorRedirect) onErrorRedirect();
          return;
        }

        const testData = testSnap.data();
        setTest(testData);

        /* ===== Fetch questions ===== */
        const q = query(
          collection(db, "questions"),
          where("testId", "==", testId)
        );

        const qsnap = await getDocs(q);

        const questionList = qsnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
  }, [testId, onErrorRedirect]);

  return {
    test,
    questions,
    loading,
  };
};

export default useTestLoader;
