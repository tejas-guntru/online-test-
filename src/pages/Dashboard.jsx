import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSearch from "../components/dashboard/DashboardSearch";
import AvailableTests from "../components/dashboard/AvailableTests";
import AttemptedTests from "../components/dashboard/AttemptedTests";
import DashboardLoader from "../components/dashboard/DashboardLoader";
import CertificateVerificationBox from "../components/dashboard/CertificateVerificationBox"; // ✅ NEW

const Dashboard = () => {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [attemptedTests, setAttemptedTests] = useState(new Set());
  const [resultsMap, setResultsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* FETCH ACTIVE TESTS */
  useEffect(() => {
    const q = query(
      collection(db, "tests"),
      where("isActive", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* FETCH ATTEMPTS */
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "results"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const attempted = new Set();
      const map = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        attempted.add(data.testId);
        map[data.testId] = data;
      });

      setAttemptedTests(attempted);
      setResultsMap(map);
    });

    return () => unsubscribe();
  }, []);

  const filtered = tests.filter((test) => {
    const term = searchTerm.toLowerCase();
    return (
      test.title.toLowerCase().includes(term) ||
      test.description?.toLowerCase().includes(term)
    );
  });

  const unattempted = filtered.filter(
    (t) => !attemptedTests.has(t.id)
  );

  const attempted = filtered.filter((t) =>
    attemptedTests.has(t.id)
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) return <DashboardLoader />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <DashboardHeader
          onProfile={() => navigate("/profile")}
          onLeaderboard={() => navigate("/public-leaderboard")}
          onLogout={handleLogout}
        />

        {/* 🔐 CERTIFICATE VERIFICATION (PUBLIC FEATURE) */}
        <CertificateVerificationBox />

        <DashboardSearch
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <AvailableTests
          tests={unattempted}
          onStart={(id) => navigate(`/test/${id}`)}
        />

        <AttemptedTests
          tests={attempted}
          resultsMap={resultsMap}
        />

      </div>
    </div>
  );
};

export default Dashboard;
