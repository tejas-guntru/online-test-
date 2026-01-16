import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES =================
   Accessible without authentication */
import Login from "./pages/Login";
import VerifyCertificate from "./pages/VerifyCertificate";

/* ================= STUDENT PAGES =================
   Requires user to be authenticated */
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Profile from "./pages/Profile";

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
        ===================================================== */}

        {/* Login / Entry point */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Public certificate verification */}
        <Route
          path="/verify/:certificateId"
          element={<VerifyCertificate />}
        />

        {/* =====================================================
            🎓 STUDENT ROUTES
        ===================================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/:id"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            🛠️ ADMIN ROUTES
        ===================================================== */}

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

        {/* OPTIONAL / LEGACY (safe to delete if unused) */}
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
