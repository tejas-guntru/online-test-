// components/profile/StatsGrid.jsx

import { motion } from "framer-motion";
import Stat from "./Stat";

const StatsGrid = ({ analytics }) => (
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
    <Stat
      label="Tests Attempted"
      value={analytics.totalTests}
    />
    <Stat
      label="Average Score"
      value={`${analytics.avgPercentage}%`}
    />
    <Stat
      label="Total Score"
      value={analytics.totalScore}
    />
  </motion.div>
);

export default StatsGrid;
