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

const EMOJI_COUNT = 18;

const Result = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const load = async () => {
      const q = query(
        collection(db, "results"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("submittedAt", "desc"),
        limit(1)
      );

      const snap = await getDocs(q);
      if (snap.empty) {
        navigate("/dashboard");
        return;
      }

      const r = { id: snap.docs[0].id, ...snap.docs[0].data() };
      setResult(r);

      const t = await getDoc(doc(db, "tests", r.testId));
      setTest(t.data());

      setLoading(false);
    };

    load();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-white/60">Loading…</p>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.total) * 100);
  const pass = test?.passPercentage || 60;
  const merit = test?.meritPercentage || 75;
  const excellence = test?.excellencePercentage || 90;

  let mood = "fail";
  if (percentage >= excellence) mood = "excellent";
  else if (percentage >= merit) mood = "merit";
  else if (percentage >= pass) mood = "participation";

  const emojiMap = {
    excellent: ["🎉", "🥳", "🎈", "⭐", "✨"],
    merit: ["😊", "🌟", "🎈", "✨"],
    participation: ["🙂", "🌈", "⭐"],
    fail: ["😔"],
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">

      {/* 🎈 FLOATING EMOJIS */}
      {mood !== "fail" &&
        [...Array(EMOJI_COUNT)].map((_, i) => {
          const emojis = emojiMap[mood];
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];

          return (
            <span
              key={i}
              className="floating-emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${22 + Math.random() * 22}px`,
              }}
            >
              {emoji}
            </span>
          );
        })}

      {/* MAIN CARD */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-black/50 border border-white/10 rounded-2xl p-10 text-center shadow-2xl space-y-6">

          <div className="text-7xl bounce">
            {mood === "excellent" && "🎉🥳"}
            {mood === "merit" && "😊✨"}
            {mood === "participation" && "🙂🌈"}
            {mood === "fail" && "😔"}
          </div>

          <h1 className="text-4xl font-extrabold text-white wiggle">
            {mood === "excellent" && "WOW! EXCELLENT!"}
            {mood === "merit" && "YAY! GREAT JOB!"}
            {mood === "participation" && "NICE TRY!"}
            {mood === "fail" && "OH NO…"}
          </h1>

          <p className="text-xl text-white/80">
            You scored <span className="font-bold">{percentage}%</span>
          </p>

          {mood === "fail" && (
            <p className="text-red-400 text-sm">
              If you want to retry, check your profile 🙂
            </p>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-6 py-2 rounded-full border border-white/20 text-white/80
                       hover:bg-white/10 transition"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .floating-emoji {
          position: absolute;
          bottom: -10%;
          animation: floatUp 6s linear infinite;
          pointer-events: none;
        }

        @keyframes floatUp {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-120vh) rotate(360deg); }
        }

        .bounce {
          animation: bounce 1.2s infinite;
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .wiggle {
          animation: wiggle 1.5s infinite;
        }

        @keyframes wiggle {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default Result;
