import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";

const CERTIFICATE_META = {
  completion: {
    label: "Completion Certificate",
    icon: "🏅",
  },
  merit: {
    label: "Merit Certificate",
    icon: "🥈",
  },
  excellence: {
    label: "Excellence Certificate",
    icon: "🥇",
  },
};

const Result = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchResultAndQuestions = async () => {
      try {
        /* 1️⃣ Latest result */
        const resultQuery = query(
          collection(db, "results"),
          where("userId", "==", auth.currentUser.uid),
          orderBy("submittedAt", "desc"),
          limit(1)
        );

        const resultSnap = await getDocs(resultQuery);
        if (resultSnap.empty) {
          navigate("/dashboard");
          return;
        }

        const resultData = {
          id: resultSnap.docs[0].id,
          ...resultSnap.docs[0].data(),
        };
        setResult(resultData);

        /* 2️⃣ Test info */
        const testSnap = await getDoc(
          doc(db, "tests", resultData.testId)
        );
        setTest(testSnap.data());

        /* 3️⃣ Questions */
        const questionsQuery = query(
          collection(db, "questions"),
          where("testId", "==", resultData.testId)
        );

        const questionsSnap = await getDocs(questionsQuery);
        setQuestions(
          questionsSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Result load error:", error);
        navigate("/dashboard");
      }
    };

    fetchResultAndQuestions();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading result...
      </div>
    );
  }

  const tier = result.certificateEarned;
  const certConfig =
    tier && test?.certificate?.[tier];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-2">
          Test Result Review
        </h1>

        <p className="mb-6">
          Score:{" "}
          <strong>
            {result.score} / {result.total}
          </strong>
        </p>

        {/* CERTIFICATE STATUS */}
        <div className="mb-8 p-4 border rounded-lg">
          {!tier ? (
            <p className="text-red-600 font-semibold">
              ❌ Not eligible for certificate
            </p>
          ) : (
            <>
              <p className="text-lg font-semibold mb-1">
                {CERTIFICATE_META[tier].icon}{" "}
                {CERTIFICATE_META[tier].label}
              </p>

              {certConfig?.isPaid ? (
                <p className="text-yellow-600 text-sm">
                  💰 Paid Certificate (₹
                  {certConfig.price})
                </p>
              ) : (
                <p className="text-green-600 text-sm">
                  ✔ Free Certificate
                </p>
              )}

              <p className="text-sm text-gray-600 mt-1">
                Manage certificates from your profile.
              </p>
            </>
          )}
        </div>

        {/* QUESTION REVIEW */}
        {questions.map((q, index) => {
          const userAnswerIndex =
            result.answers?.[q.id];
          const correctIndex = q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className="mb-6 p-4 border rounded-lg"
            >
              <h3 className="font-semibold mb-2">
                {index + 1}. {q.questionText}
              </h3>

              {q.options.map((opt, i) => {
                const isCorrect = i === correctIndex;
                const isUserAnswer =
                  i === userAnswerIndex;

                let color = "text-gray-700";
                if (isCorrect) color = "text-green-600";
                else if (isUserAnswer)
                  color = "text-red-600";

                return (
                  <p
                    key={i}
                    className={`ml-4 ${color}`}
                  >
                    {isUserAnswer && "➤ "}
                    {opt}
                    {isCorrect && " ✔"}
                  </p>
                );
              })}
            </div>
          );
        })}

        {/* ACTION */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;
