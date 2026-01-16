import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES =================
   Accessible without authentication */
import Login from "./pages/Login";
import PublicLeaderboard from "./pages/PublicLeaderboard";
import VerifyCertificate from "./pages/VerifyCertificate"; // Public verification

/* ================= STUDENT PAGES =================
   Requires user to be authenticated (student role) */
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

/* ================= ADMIN PAGES =================
   Requires authenticated admin role */
import Admin from "./pages/Admin";
import ManageQuestions from "./pages/ManageQuestions";

/* ================= ROUTE GUARDS =================
   Security layers for authentication & authorization */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

/**
 * App Component
 *
 * PURPOSE:
 * - Central routing configuration
 * - Defines public, student, and admin routes
 * - Applies route guards for security
 *
 * SECURITY MODEL:
 * - ProtectedRoute → ensures user is logged in
 * - AdminRoute     → ensures user has admin role
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            🌐 PUBLIC ROUTES
            - No login required
            - Accessible by anyone
        ===================================================== */}

        {/* Login / Entry point */}
        <Route path="/" element={<Login />} />

        {/* Public leaderboard (optional marketing / SEO page) */}
        <Route
          path="/public-leaderboard"
          element={<PublicLeaderboard />}
        />

        {/* 🔐 Public certificate verification
            Used by employers / third parties */}
        <Route
          path="/verify/:certificateId"
          element={<VerifyCertificate />}
        />

        {/* =====================================================
            🎓 STUDENT ROUTES
            - Requires authentication
            - Wrapped in ProtectedRoute
        ===================================================== */}

        {/* Student dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Attempt a test */}
        <Route
          path="/test/:id"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        {/* View result after submission */}
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        {/* Student profile (analytics + certificates) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Private leaderboard for logged-in users */}
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            🛠️ ADMIN ROUTES
            - Requires authentication + admin role
            - ProtectedRoute → logged in
            - AdminRoute     → role === "admin"
        ===================================================== */}

        {/* Admin dashboard (test creation + management) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Admin />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* -----------------------------------------------------
           ⚠️ OPTIONAL / DEPRECATED (Based on your decision)
           ManageQuestions page
           - You decided to REMOVE post-creation question editing
           - This route can be safely DELETED if not needed
        ----------------------------------------------------- */}
        <Route
          path="/admin/tests/:testId/questions"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <ManageQuestions />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
