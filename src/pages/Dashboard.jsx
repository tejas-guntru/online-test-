// ==================== REACT CORE ====================
// useState  → to store UI + data state
// useEffect → to fetch data on component load (and real-time updates)
import { useEffect, useState } from "react";

// ==================== FIREBASE CORE ====================
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

// Firestore helpers:
// collection → reference a collection
// onSnapshot → real-time listener
// query + where → filtered queries
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

// ==================== ROUTING ====================
// useNavigate → programmatic navigation between pages
import { useNavigate } from "react-router-dom";

// ==================== UI COMPONENTS ====================

// Top navigation bar (profile, leaderboard, logout)
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
  // Navigation handler
  const navigate = useNavigate();

  // ==================== STATE ====================

  // All ACTIVE tests fetched from Firestore
  const [tests, setTests] = useState([]);

  // Set of test IDs the user has already attempted
  // Using Set gives O(1) lookup (very efficient)
  const [attemptedTests, setAttemptedTests] = useState(new Set());

  // Map of testId → result object
  // Used to show score, percentage, certificate, etc.
  const [resultsMap, setResultsMap] = useState({});

  // Controls loading screen
  const [loading, setLoading] = useState(true);

  // Search input value
  const [searchTerm, setSearchTerm] = useState("");


  // ======================================================
  // FEATURE 1: FETCH ACTIVE TESTS (REAL-TIME)
  // ======================================================
  useEffect(() => {
    // Query only ACTIVE tests
    const q = query(
      collection(db, "tests"),
      where("isActive", "==", true)
    );

    // Real-time Firestore listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Convert Firestore docs into usable JS objects
      setTests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Stop loader once data arrives
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);


  // ======================================================
  // FEATURE 2: FETCH USER ATTEMPTS (REAL-TIME)
  // ======================================================
  useEffect(() => {
    // Safety check: if user not logged in
    if (!auth.currentUser) return;

    // Fetch results only for current user
    const q = query(
      collection(db, "results"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const attempted = new Set(); // stores attempted test IDs
      const map = {};              // stores testId → result

      snapshot.docs.forEach((doc) => {
        const data = doc.data();

        // Mark test as attempted
        attempted.add(data.testId);

        // Store full result data
        map[data.testId] = data;
      });

      // Update state
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

    // Search by title OR description
    return (
      test.title.toLowerCase().includes(term) ||
      test.description?.toLowerCase().includes(term)
    );
  });


  // ======================================================
  // FEATURE 4: SPLIT TESTS BASED ON ATTEMPT STATUS
  // ======================================================

  // Tests user has NOT attempted yet
  const unattempted = filtered.filter(
    (t) => !attemptedTests.has(t.id)
  );

  // Tests user HAS already attempted
  const attempted = filtered.filter(
    (t) => attemptedTests.has(t.id)
  );


  // ======================================================
  // FEATURE 5: LOGOUT
  // ======================================================
  const handleLogout = async () => {
    await signOut(auth); // Firebase sign-out
    navigate("/");       // Redirect to home/login
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
          onLeaderboard={() => navigate("/public-leaderboard")}
          onLogout={handleLogout}
        />

        {/* ================= CERTIFICATE VERIFICATION =================
            Public feature – allows anyone to verify certificates */}
        <CertificateVerificationBox />

        {/* ================= SEARCH ================= */}
        <DashboardSearch
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* ================= AVAILABLE TESTS =================
            Tests user can start */}
        <AvailableTests
          tests={unattempted}
          onStart={(id) => navigate(`/test/${id}`)}
        />

        {/* ================= ATTEMPTED TESTS =================
            Tests already taken by user */}
        <AttemptedTests
          tests={attempted}
          resultsMap={resultsMap}
        />

      </div>
    </div>
  );
};

export default Dashboard;
