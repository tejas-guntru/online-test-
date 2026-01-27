import { motion } from "framer-motion";
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
      {/* ================= BACKGROUND GLOWS ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Top cyan glow */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
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
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
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
      </motion.div>

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20"
      >
        <DashboardHeader />
      </motion.div>

      {/* ================= PAGE CONTENT ================= */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="relative z-10"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
