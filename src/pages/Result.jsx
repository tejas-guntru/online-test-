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
  completion: { label: "Completion Certificate", icon: "🏅" },
  merit: { label: "Merit Certificate", icon: "🥈" },
  excellence: { label: "Excellence Certificate", icon: "🥇" },
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

        const testSnap = await getDoc(
          doc(db, "tests", resultData.testId)
        );
        setTest(testSnap.data());

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

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-sm text-white/60">
          Loading result…
        </p>
      </div>
    );
  }

  const tier = result.certificateEarned;
  const certConfig = tier && test?.certificate?.[tier];

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div
        className="
          max-w-4xl mx-auto
          rounded-xl p-6
          bg-black/40
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          space-y-8
        "
      >
        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-2xl font-semibold text-white/90 mb-1">
            Test Result Review
          </h1>
          <p className="text-white/60">
            Final submission · Read-only
          </p>
        </div>

        {/* ================= SCORE SUMMARY ================= */}
        <div className="rounded-lg p-4 bg-black/30 border border-white/5">
          <p className="text-sm text-white/55">
            Score
          </p>
          <p className="text-2xl font-semibold text-white/90">
            {result.score} / {result.total}
          </p>
        </div>

        {/* ================= CERTIFICATE STATUS ================= */}
        <div className="rounded-lg p-4 border border-white/5 bg-black/30">
          {!tier ? (
            <p className="text-red-400 font-medium">
              ❌ Not eligible for certificate
            </p>
          ) : (
            <>
              <p className="text-lg font-semibold text-white/90 mb-1">
                {CERTIFICATE_META[tier].icon}{" "}
                {CERTIFICATE_META[tier].label}
              </p>

              {certConfig?.isPaid ? (
                <p className="text-sm text-orange-400">
                  Paid Certificate • ₹{certConfig.price}
                </p>
              ) : (
                <p className="text-sm text-emerald-400">
                  Free Certificate
                </p>
              )}

              <p className="text-xs text-white/45 mt-1">
                Manage certificates from your profile.
              </p>
            </>
          )}
        </div>

        {/* ================= QUESTION REVIEW ================= */}
        <div className="space-y-6">
          {questions.map((q, index) => {
            const userAnswerIndex =
              result.answers?.[q.id];
            const correctIndex =
              q.correctOptionIndex;

            return (
              <div
                key={q.id}
                className="
                  rounded-lg p-4
                  bg-black/30
                  border border-white/5
                "
              >
                <h3 className="font-medium text-white/85 mb-3">
                  {index + 1}. {q.questionText}
                </h3>

                <div className="space-y-1">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === correctIndex;
                    const isUserAnswer =
                      i === userAnswerIndex;

                    let color = "text-white/65";
                    if (isCorrect)
                      color = "text-emerald-400";
                    else if (isUserAnswer)
                      color = "text-red-400";

                    return (
                      <p
                        key={i}
                        className={`ml-4 text-sm ${color}`}
                      >
                        {isUserAnswer && "➤ "}
                        {opt}
                        {isCorrect && " ✔"}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="
              px-6 py-2 rounded-md
              bg-transparent
              border border-white/10
              text-white/80
              transition-all
              hover:border-cyan-400
              hover:text-cyan-300
              hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
            "
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
