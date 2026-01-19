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
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSearch from "../components/dashboard/DashboardSearch";
import AvailableTests from "../components/dashboard/AvailableTests";
import AttemptedTests from "../components/dashboard/AttemptedTests";
import DashboardLoader from "../components/dashboard/DashboardLoader";
import CertificateVerificationBox from "../components/dashboard/CertificateVerificationBox";

// ======================================================
// DASHBOARD (STUDENT HOME)
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
  // FEATURE 1: FETCH ACTIVE TESTS
  // ======================================================
  useEffect(() => {
    const q = query(
      collection(db, "tests"),
      where("isActive", "==", true)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setTests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ======================================================
  // FEATURE 2: FETCH QUESTIONS → BUILD IMAGE MAP
  // ======================================================
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "questions"),
      (snapshot) => {
        const imageMap = {};

        snapshot.docs.forEach((doc) => {
          const { testId, imageUrl } = doc.data();

          // Take FIRST image per test only
          if (imageUrl && !imageMap[testId]) {
            imageMap[testId] = imageUrl;
          }
        });

        // Merge image into tests
        setTests((prev) =>
          prev.map((t) => ({
            ...t,
            previewImage: imageMap[t.id] || t.thumbnail || null,
          }))
        );
      }
    );

    return () => unsub();
  }, []);

  // ======================================================
  // FEATURE 3: FETCH USER ATTEMPTS
  // ======================================================
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "results"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
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

    return () => unsub();
  }, []);

  // ======================================================
  // FEATURE 4: SEARCH
  // ======================================================
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
  // LOADING
  // ======================================================
  if (loading) return <DashboardLoader />;

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <DashboardHeader
          onProfile={() => navigate("/profile")}
          onLogout={handleLogout}
        />

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
