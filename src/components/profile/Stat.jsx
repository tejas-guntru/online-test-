// components/profile/Stat.jsx

import { motion } from "framer-motion";

const Stat = ({ label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
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

export default Stat;
