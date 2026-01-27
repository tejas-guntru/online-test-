import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  documentId,
} from "firebase/firestore";

import AttemptedTests from "../components/dashboard/AttemptedTests";

const DashboardAttempts = () => {
  const [tests, setTests] = useState([]);
  const [resultsMap, setResultsMap] = useState({});

  /* ================= LOAD USER RESULTS ================= */
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "results"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const map = {};
      snap.docs.forEach((d) => {
        const data = d.data();
        map[data.testId] = data;
      });
      setResultsMap(map);
    });

    return () => unsub();
  }, []);

  /* ================= LOAD ATTEMPTED TEST DETAILS ================= */
  useEffect(() => {
    const attemptedIds = Object.keys(resultsMap);
    if (attemptedIds.length === 0) {
      setTests([]);
      return;
    }

    const chunks = [];
    for (let i = 0; i < attemptedIds.length; i += 10) {
      chunks.push(attemptedIds.slice(i, i + 10));
    }

    const unsubscribers = chunks.map((ids) => {
      const q = query(
        collection(db, "tests"),
        where(documentId(), "in", ids)
      );

      return onSnapshot(q, (snap) => {
        setTests((prev) => {
          const map = {};
          prev.forEach((t) => (map[t.id] = t));

          snap.docs.forEach((d) => {
            map[d.id] = {
              id: d.id,
              ...d.data(),
              previewImage: d.data().thumbnailUrl || null,
            };
          });

          return Object.values(map);
        });
      });
    });

    return () => unsubscribers.forEach((u) => u());
  }, [resultsMap]);

  /* ================= SUMMARY ================= */
  const totalAttempts = Object.keys(resultsMap).length;

  const averageScore =
    totalAttempts > 0
      ? (
          Object.values(resultsMap).reduce(
            (sum, r) => sum + (r.percentage || 0),
            0
          ) / totalAttempts
        ).toFixed(1)
      : 0;

  return (
    <div className="pt-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ================= PAGE HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">
            Attempted Tests
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Review your completed tests and performance.
          </p>
        </motion.div>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="
              bg-black/40 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-6
              shadow-[0_0_25px_rgba(34,211,238,0.18)]
            "
          >
            <p className="text-sm text-gray-400">
              Total Attempts
            </p>
            <p className="text-3xl font-bold text-white mt-1">
              {totalAttempts}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: "easeOut" }}
            className="
              bg-black/40 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-6
              shadow-[0_0_25px_rgba(34,211,238,0.18)]
            "
          >
            <p className="text-sm text-gray-400">
              Average Score
            </p>
            <p className="text-3xl font-bold text-white mt-1">
              {averageScore}%
            </p>
          </motion.div>
        </div>

        {/* ================= TEST HISTORY ================= */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            bg-black/40 backdrop-blur-xl
            border border-white/10
            rounded-2xl p-6
            shadow-[0_0_30px_rgba(34,211,238,0.2)]
          "
        >
          <h2 className="text-lg font-semibold text-cyan-300 mb-4">
            Test History
          </h2>

          <AttemptedTests
            tests={tests}
            resultsMap={resultsMap}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default DashboardAttempts;
