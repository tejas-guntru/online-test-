/**
 * ProfileAnalytics Component
 *
 * Displays high-level user performance analytics
 */

import { motion } from "framer-motion";

const ProfileAnalytics = ({ results }) => {
  const total = results.length;

  const passed = results.filter(
    (r) => (r.score / r.total) * 100 >= 40
  ).length;

  const failed = total - passed;

  return (
    /* ==================== ANALYTICS GRID ==================== */
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      <Stat label="Tests Attempted" value={total} />
      <Stat label="Passed" value={passed} />
      <Stat label="Failed" value={failed} />
    </motion.div>
  );
};

/**
 * Stat Component
 *
 * Displays a single analytics metric
 */
const Stat = ({ label, value }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="
      rounded-xl p-5
      bg-[#020617]
      border border-white/5
      text-center
    "
  >
    <p className="text-sm text-white/55 mb-1">
      {label}
    </p>

    <p className="text-3xl font-semibold text-white/90">
      {value}
    </p>
  </motion.div>
);

export default ProfileAnalytics;
