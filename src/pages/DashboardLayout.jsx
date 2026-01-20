import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)]
        text-white
        relative
        overflow-hidden
      "
    >
      {/* ================= BACKGROUND GLOWS (LOWEST) ================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top cyan glow */}
        <div
          className="
            absolute
            -top-48
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            bg-cyan-500/20
            rounded-full
            blur-[160px]
          "
        />

        {/* Bottom violet glow */}
        <div
          className="
            absolute
            bottom-[-300px]
            right-[-300px]
            w-[600px]
            h-[600px]
            bg-violet-600/20
            rounded-full
            blur-[180px]
          "
        />
      </div>

      {/* ================= HEADER (ABOVE GLOWS) ================= */}
      <div className="relative z-20">
        <DashboardHeader />
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
