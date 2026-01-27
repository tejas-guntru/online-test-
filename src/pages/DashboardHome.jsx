import { motion } from "framer-motion";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardJourney from "../components/dashboard/DashboardJourney";
import DashboardWhy from "../components/dashboard/DashboardWhy";
import DashboardFooterNote from "../components/dashboard/DashboardFooterNote";

/* ================= MOTION CONFIG ================= */

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Apple-style easing
    },
  },
};

/* ================= PAGE ================= */

const DashboardHome = () => {
  return (
    <div className="space-y-28">

      {/* ===== HERO ===== */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <DashboardHero />
      </motion.div>

      {/* ===== STATS ===== */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DashboardStats />
      </motion.div>

      {/* ===== JOURNEY ===== */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DashboardJourney />
      </motion.div>

      {/* ===== WHY ===== */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DashboardWhy />
      </motion.div>

      {/* ===== FOOTER NOTE ===== */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DashboardFooterNote />
      </motion.div>

    </div>
  );
};

export default DashboardHome;
