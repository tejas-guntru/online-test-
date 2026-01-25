const reasons = [
  {
    title: "Proof Over Claims",
    description:
      "Demonstrate real, measurable skills instead of relying on self-declared expertise.",
  },
  {
    title: "Performance-Backed Certificates",
    description:
      "Every certificate is generated only after successful assessment completion.",
  },
  {
    title: "Public Verification",
    description:
      "Anyone can verify a certificate instantly using its unique ID — no login required.",
  },
  {
    title: "Built for Real Stakeholders",
    description:
      "Designed with employers, institutions, and serious learners in mind.",
  },
];

const DashboardWhy = () => {
  return (
    <section className="space-y-12 w-full">

      {/* ===== Header (full width, readable) ===== */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400">
          Why This Platform Exists
        </h2>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          This platform was built to solve a real problem in skill validation —
          trust.
        </p>
      </div>

      {/* ===== Reasons Grid (FULL WIDTH) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {reasons.map((item) => (
          <ReasonCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardWhy;

/* ================= REASON CARD ================= */

const ReasonCard = ({ title, description }) => {
  return (
    <div
      className="
        relative
        h-full
        rounded-2xl
        border border-white/10
        bg-[#020617]
        p-6
        space-y-3
        transition
        hover:-translate-y-1
        hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
      "
    >
      {/* Accent Marker */}
      <div className="w-8 h-1 bg-cyan-400 rounded-full" />

      <h3 className="text-sm sm:text-base font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-white/60 leading-relaxed">
        {description}
      </p>

      {/* Soft glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-transparent opacity-40 pointer-events-none" />
    </div>
  );
};
