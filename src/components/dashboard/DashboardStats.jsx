import { motion } from "framer-motion";

/* ================= DATA ================= */

const stats = [
  {
    label: "Tests Available",
    value: "20+",
    accent: "cyan",
  },
  {
    label: "Certificates Issued",
    value: "1,200+",
    accent: "blue",
  },
  {
    label: "Verified Attempts",
    value: "98%",
    accent: "emerald",
  },
  {
    label: "Avg. Completion Time",
    value: "45 min",
    accent: "violet",
  },
];

const accentMap = {
  cyan: "from-cyan-400/30 to-cyan-400/0",
  blue: "from-blue-400/30 to-blue-400/0",
  emerald: "from-emerald-400/30 to-emerald-400/0",
  violet: "from-violet-400/30 to-violet-400/0",
};

/* ================= COMPONENT ================= */

const DashboardStats = () => {
  return (
    <section
      className="
        grid grid-cols-2 sm:grid-cols-4
        gap-4 sm:gap-6
      "
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
            ease: "easeOut",
          }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </section>
  );
};

export default DashboardStats;

/* ================= STAT CARD ================= */

const StatCard = ({ label, value, accent }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#020617]
        p-4 sm:p-6
        hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]
      "
    >
      {/* Accent Glow */}
      <div
        className={`
          absolute inset-0
          bg-gradient-to-br ${accentMap[accent]}
          opacity-40
          pointer-events-none
        `}
      />

      {/* Content */}
      <div className="relative space-y-2">
        <p
          className="
            text-2xl sm:text-3xl
            font-semibold text-white
            tracking-tight
          "
        >
          {value}
        </p>

        <p
          className="
            text-xs sm:text-sm
            text-white/60
          "
        >
          {label}
        </p>
      </div>
    </motion.div>
  );
};
