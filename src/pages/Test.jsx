import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { decideCertificate } from "../utils/certificateDecision";

/**
 * Test Component
 *
 * PURPOSE:
 * - Allows a student to ATTEMPT a test
 * - Fetches test metadata + questions from Firestore
 * - Handles timer countdown
 * - Collects answers
 * - Calculates score & percentage
 * - Decides certificate eligibility
 * - Saves result to Firestore
 *
 * ROUTE:
 * /test/:id
 *
 * USED BY:
 * - Student Dashboard → Start Test
 */

const Test = () => {
  /* ================= ROUTING ================= */
  const { id: testId } = useParams();   // Test ID from URL
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [test, setTest] = useState(null);          // Test metadata
  const [questions, setQuestions] = useState([]);  // Questions list
  const [answers, setAnswers] = useState({});      // questionId → optionIndex
  const [timeLeft, setTimeLeft] = useState(0);     // Remaining time (seconds)
  const [loading, setLoading] = useState(true);    // Initial load state
  const [submitting, setSubmitting] = useState(false); // Prevent double submit

  /* ================= FETCH TEST & QUESTIONS =================
     - Fetches test document
     - Fetches all questions linked to this test
     - Initializes timer based on test duration */
  useEffect(() => {
    const loadTest = async () => {
      try {
        /* Fetch test metadata */
        const testSnap = await getDoc(doc(db, "tests", testId));

        if (!testSnap.exists()) {
          alert("Test not found");
          navigate("/dashboard");
          return;
        }

        const testData = testSnap.data();
        setTest(testData);

        /* Initialize timer (minutes → seconds) */
        setTimeLeft(testData.duration * 60);

        /* Fetch test questions */
        const q = query(
          collection(db, "questions"),
          where("testId", "==", testId)
        );
        const qsnap = await getDocs(q);

        const qs = qsnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setQuestions(qs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load test");
        navigate("/dashboard");
      }
    };

    loadTest();
  }, [testId, navigate]);

  /* ================= TIMER LOGIC =================
     - Runs every second
     - Auto-submits test when time reaches zero
     - Stops when submitting */
  useEffect(() => {
    if (loading || submitting) return;

    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit on timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, submitting]);

  /* ================= ANSWER SELECTION =================
     Stores user's selected option per question */
  const selectAnswer = (qId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  /* ================= SUBMIT TEST =================
     - Calculates score
     - Calculates percentage
     - Decides certificate eligibility
     - Saves result in Firestore
     - Redirects to Result page */
  const handleSubmit = async () => {
    if (submitting) return; // Prevent double submit
    setSubmitting(true);

    try {
      let score = 0;

      /* Calculate score */
      questions.forEach((q) => {
        if (answers[q.id] === q.correctOptionIndex) {
          score++;
        }
      });

      const total = questions.length;
      const percentage = Math.round((score / total) * 100);

      /* Decide certificate based on percentage */
      const certificateEarned = decideCertificate({
        percentage,
        certificateConfig: test.certificate,
      });

      /* Save result to Firestore */
      await addDoc(collection(db, "results"), {
        userId: auth.currentUser.uid,
        testId,
        score,
        total,
        percentage,

        certificateEarned, // completion | merit | excellence | null
        certificateStatus: certificateEarned ? "available" : "none",

        submittedAt: serverTimestamp(),
      });

      /* Redirect to result page */
      navigate("/result", {
        state: {
          score,
          total,
          percentage,
          certificateEarned,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit test");
      setSubmitting(false);
    }
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading test...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {test.title}
          </h1>

          {/* TIMER DISPLAY */}
          <span className="text-red-600 font-semibold">
            ⏱ {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>

        {/* ================= QUESTIONS ================= */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="border p-4 rounded-lg"
            >
              <p className="font-medium mb-3">
                {index + 1}. {q.questionText}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <label
                    key={oi}
                    className={`flex items-center gap-2 border p-2 rounded cursor-pointer ${
                      answers[q.id] === oi
                        ? "bg-blue-50 border-blue-500"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === oi}
                      onChange={() =>
                        selectAnswer(q.id, oi)
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ================= SUBMIT BUTTON ================= */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
