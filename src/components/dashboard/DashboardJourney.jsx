import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ================= DATA ================= */

const journeySteps = [
  {
    step: "01",
    title: "Attempt Test",
    description: "Choose a test and complete it within the time limit.",
    action: "View Tests",
    route: "/dashboard/tests",
  },
  {
    step: "02",
    title: "Auto Evaluation",
    description: "Your submission is evaluated instantly and objectively.",
  },
  {
    step: "03",
    title: "Get Certificate",
    description: "Eligible candidates can download certificates from profile.",
    action: "Open Profile",
    route: "/dashboard/profile",
  },
  {
    step: "04",
    title: "Share & Verify",
    description: "Anyone can verify your certificate using its ID.",
    action: "Verify",
    route: "/dashboard/verify",
  },
];

/* ================= COMPONENT ================= */

const DashboardJourney = () => {
  const navigate = useNavigate();

  return (
    <section className="space-y-10">

      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-2 max-w-3xl"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400">
          Certification Journey
        </h2>
        <p className="text-white/60 leading-relaxed">
          Every certificate follows a fair, performance-based flow — no
          shortcuts, no ambiguity.
        </p>
      </motion.div>

      {/* ===== Journey Grid ===== */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
        {journeySteps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <JourneyCard
              {...item}
              onNavigate={navigate}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashboardJourney;

/* ================= JOURNEY CARD ================= */

const JourneyCard = ({
  step,
  title,
  description,
  action,
  route,
  onNavigate,
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        relative
        rounded-2xl
        border border-white/10
        bg-[#020617]
        p-6
        space-y-4
        hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
      "
    >
      {/* Step Number */}
      <div
        className="
          w-10 h-10
          rounded-full
          flex items-center justify-center
          text-sm font-semibold
          text-cyan-300
          bg-cyan-400/10
          border border-cyan-400/30
        "
      >
        {step}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-white/60 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action */}
      {action && route && (
        <button
          onClick={() => onNavigate(route)}
          className="
            text-sm font-medium
            text-cyan-400
            hover:text-cyan-300
            transition
          "
        >
          {action} →
        </button>
      )}

      {/* Accent Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-transparent opacity-40 pointer-events-none" />
    </motion.div>
  );
};
