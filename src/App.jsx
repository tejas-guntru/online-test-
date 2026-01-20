import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Login from "./pages/Login";
import VerifyCertificate from "./pages/VerifyCertificate";

/* ================= STUDENT DASHBOARD ================= */
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DashboardTests from "./pages/DashboardTests";
import DashboardAttempts from "./pages/DashboardAttempts";
import Profile from "./pages/Profile";

/* ================= STUDENT OTHER PAGES ================= */
import Test from "./pages/Test";
import TestIntro from "./pages/TestIntro";
import Result from "./pages/Result";
import Modules from "./pages/Modules";
import ModuleView from "./pages/ModuleView";

/* ================= ADMIN PAGES ================= */
import Admin from "./pages/Admin";
import AdminModules from "./pages/AdminModules";

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Login />} />

        <Route
          path="/verify/:certificateId"
          element={<VerifyCertificate />}
        />

        {/* ================= STUDENT DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT DASHBOARD PAGE */}
          <Route index element={<DashboardHome />} />

          {/* NAVBAR ROUTES */}
          <Route path="tests" element={<DashboardTests />} />
          <Route path="attempts" element={<DashboardAttempts />} />

          {/* ✅ PROFILE MOVED HERE */}
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ================= TEST FLOW ================= */}
        <Route
          path="/test/:id/intro"
          element={
            <ProtectedRoute>
              <TestIntro />
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

        {/* ================= MODULES (STUDENT) ================= */}
        <Route
          path="/modules"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules/:id"
          element={
            <ProtectedRoute>
              <ModuleView />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
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

        <Route
          path="/admin/modules/*"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminModules />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
