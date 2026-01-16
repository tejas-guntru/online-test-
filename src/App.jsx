import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= PUBLIC PAGES =================
import Login from "./pages/Login";
import PublicLeaderboard from "./pages/PublicLeaderboard";
import VerifyCertificate from "./pages/VerifyCertificate"; // ✅ NEW

// ================= STUDENT PAGES =================
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

// ================= ADMIN PAGES =================
import Admin from "./pages/Admin";
import ManageQuestions from "./pages/ManageQuestions";

// ================= ROUTE GUARDS =================
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Login />} />
        <Route
          path="/public-leaderboard"
          element={<PublicLeaderboard />}
        />

        {/* 🔐 PUBLIC CERTIFICATE VERIFICATION */}
        <Route
          path="/verify/:certificateId"
          element={<VerifyCertificate />}
        />

        {/* ========== STUDENT ROUTES ========== */}
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

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        {/* ========== ADMIN ROUTES ========== */}
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

        {/* MANAGE QUESTIONS (ADMIN ONLY) */}
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
