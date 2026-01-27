import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import DashboardSearch from "../components/dashboard/DashboardSearch";
import AvailableTests from "../components/dashboard/AvailableTests";

const DashboardTests = () => {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attemptedMap, setAttemptedMap] = useState({});

  /* ================= LOAD ACTIVE TESTS ================= */
  useEffect(() => {
    const q = query(
      collection(db, "tests"),
      where("isActive", "==", true)
    );

    const unsub = onSnapshot(q, (snap) => {
      setTests(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          previewImage: d.data().thumbnailUrl || null,
        }))
      );
    });

    return () => unsub();
  }, []);

  /* ================= LOAD USER ATTEMPTS ================= */
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "results"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const map = {};
      snap.docs.forEach((d) => {
        map[d.data().testId] = true;
      });
      setAttemptedMap(map);
    });

    return () => unsub();
  }, []);

  /* ================= FILTER AVAILABLE TESTS ================= */
  const filteredTests = tests
    .filter((t) => !attemptedMap[t.id])
    .filter(
      (t) =>
        t.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        t.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

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
            Available Tests
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Each test can be attempted only once.
          </p>
        </motion.div>

        {/* ================= SEARCH ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="
            bg-black/40 backdrop-blur-xl
            border border-white/10
            rounded-xl p-4
            shadow-[0_0_25px_rgba(34,211,238,0.15)]
          "
        >
          <DashboardSearch
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </motion.div>

        {/* ================= TEST LIST ================= */}
        {filteredTests.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AvailableTests
              tests={filteredTests}
              onStart={(id) => navigate(`/test/${id}`)}
            />
          </motion.div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
              bg-black/40 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              p-8 text-center
              shadow-[0_0_30px_rgba(34,211,238,0.2)]
            "
          >
            <p className="text-gray-300 text-lg">
              🎉 You’ve attempted all available tests
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Check your performance in the Attempts section.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default DashboardTests;
