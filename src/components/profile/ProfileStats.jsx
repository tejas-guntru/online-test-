/**
 * ProfileStats Component
 *
 * Displays aggregate performance statistics
 */

import { motion } from "framer-motion";

const ProfileStats = ({
  totalTests,
  avgPercentage,
  totalScore,
}) => {
  return (
    /* ==================== STATS GRID ==================== */
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
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
    >
      <StatBox label="Tests Attempted" value={totalTests} />
      <StatBox label="Average Score" value={`${avgPercentage}%`} />
      <StatBox label="Total Score" value={totalScore} />
    </motion.div>
  );
};

/**
 * StatBox Component
 *
 * Displays a single metric
 */
const StatBox = ({ label, value }) => (
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

export default ProfileStats;
