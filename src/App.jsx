import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Login from "./pages/Login";
import VerifyCertificate from "./pages/VerifyCertificate";

/* ================= STUDENT PAGES ================= */
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Modules from "./pages/Modules";
import ModuleView from "./pages/ModuleView";
import TestIntro from "./pages/TestIntro";

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

        {/* ================= STUDENT ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ======== TEST INTRO (NEW) ======== */}
        <Route
          path="/test/:id/intro"
          element={
            <ProtectedRoute>
              <TestIntro />
            </ProtectedRoute>
          }
        />

        {/* ======== ACTUAL TEST ======== */}
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

        {/* ======== MODULES (STUDENT) ======== */}
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

        {/* ======== MODULES (ADMIN) ======== */}
        {/* ⚠️ NOTE THE /* AT THE END */}
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
