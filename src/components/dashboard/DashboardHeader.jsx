import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import SideNavDrawer from "./SideNavDrawer";

/* ================= NAV CONFIG ================= */

const NAV_TOP = [
  { label: "Home", path: "/dashboard" },
  { label: "Verify Certificate", path: "/dashboard/verify" },
  { label: "Tests", path: "/dashboard/tests" },
  { label: "Attempts", path: "/dashboard/attempts" },
];

const NAV_BOTTOM = [
  { label: "Profile", path: "/dashboard/profile" },
];

const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= ACTIVE STATE ================= */
  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  /* ================= NAVIGATION ================= */
  const go = (path) => {
    setSidebarOpen(false);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="h-14 flex items-center gap-3 px-4 bg-black/80 border-b border-white/10">
        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="min-w-[44px] min-h-[44px] rounded-md bg-white/10 text-white"
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Title / Logo placeholder */}
        <span className="text-cyan-400 font-semibold">
          Dashboard
        </span>
      </div>

      {/* ================= SIDEBAR ================= */}
      <SideNavDrawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={go}
        isActive={isActive}
        topItems={NAV_TOP}
        bottomItems={NAV_BOTTOM}
      />
    </>
  );
};

export default DashboardHeader;
