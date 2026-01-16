// ==================== REACT CORE ====================
import { useEffect, useState } from "react";

// ==================== FIREBASE CORE ====================
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

// ==================== ROUTING ====================
import { useNavigate } from "react-router-dom";

// ==================== UI COMPONENTS ====================

// Top navigation bar (profile, logout)
import DashboardHeader from "../components/dashboard/DashboardHeader";

// Search bar to filter tests
import DashboardSearch from "../components/dashboard/DashboardSearch";

// Shows tests NOT yet attempted by user
import AvailableTests from "../components/dashboard/AvailableTests";

// Shows tests already attempted by user
import AttemptedTests from "../components/dashboard/AttemptedTests";

// Loader shown while data is being fetched
import DashboardLoader from "../components/dashboard/DashboardLoader";

// Public certificate verification box
import CertificateVerificationBox from "../components/dashboard/CertificateVerificationBox";

// ======================================================
// DASHBOARD COMPONENT (STUDENT HOME PAGE)
// ======================================================
const Dashboard = () => {
  const navigate = useNavigate();

  // ==================== STATE ====================

  const [tests, setTests] = useState([]);
  const [attemptedTests, setAttemptedTests] = useState(new Set());
  const [resultsMap, setResultsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ======================================================
  // FEATURE 1: FETCH ACTIVE TESTS (REAL-TIME)
  // ======================================================
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

  // ======================================================
  // FEATURE 2: FETCH USER ATTEMPTS (REAL-TIME)
  // ======================================================
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

  // ======================================================
  // FEATURE 3: SEARCH FILTER
  // ======================================================
  const filtered = tests.filter((test) => {
    const term = searchTerm.toLowerCase();
    return (
      test.title.toLowerCase().includes(term) ||
      test.description?.toLowerCase().includes(term)
    );
  });

  // ======================================================
  // FEATURE 4: SPLIT TESTS
  // ======================================================
  const unattempted = filtered.filter(
    (t) => !attemptedTests.has(t.id)
  );

  const attempted = filtered.filter(
    (t) => attemptedTests.has(t.id)
  );

  // ======================================================
  // FEATURE 5: LOGOUT
  // ======================================================
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // ======================================================
  // FEATURE 6: LOADING STATE
  // ======================================================
  if (loading) return <DashboardLoader />;

  // ======================================================
  // UI RENDER
  // ======================================================
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <DashboardHeader
          onProfile={() => navigate("/profile")}
          onLogout={handleLogout}
        />

        {/* ================= CERTIFICATE VERIFICATION ================= */}
        <CertificateVerificationBox />

        {/* ================= SEARCH ================= */}
        <DashboardSearch
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* ================= AVAILABLE TESTS ================= */}
        <AvailableTests
          tests={unattempted}
          onStart={(id) => navigate(`/test/${id}`)}
        />

        {/* ================= ATTEMPTED TESTS ================= */}
        <AttemptedTests
          tests={attempted}
          resultsMap={resultsMap}
        />

      </div>
    </div>
  );
};

export default Dashboard;
