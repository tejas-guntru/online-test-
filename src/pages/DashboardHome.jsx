import { useNavigate } from "react-router-dom";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardJourney from "../components/dashboard/DashboardJourney";
import DashboardWhy from "../components/dashboard/DashboardWhy";
import DashboardFooterNote from "../components/dashboard/DashboardFooterNote";


const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-20">

      {/* ================= HERO ================= */}
      <DashboardHero />

      {/* ================= STATS ================= */}
      <DashboardStats />

      {/* ================= JOURNEY ================= */}
      <DashboardJourney />

      {/* ================= WHY IT MATTERS ================= */}
       <DashboardWhy />

      {/* ================= FOOTER NOTE ================= */}
      <DashboardFooterNote />

    </div>
  );
};

export default DashboardHome;

/* ================= REUSABLE UI ================= */

const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="
      px-6 py-3 rounded-xl
      bg-cyan-500 text-black font-medium
      hover:bg-cyan-400 transition
    "
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="
      px-6 py-3 rounded-xl
      border border-white/10
      text-white/80
      hover:border-cyan-400/40
      hover:text-white transition
    "
  >
    {children}
  </button>
);

const StatCard = ({ label, value }) => (
  <div className="p-5 rounded-xl bg-[#020617] border border-white/5">
    <p className="text-2xl font-semibold text-white">{value}</p>
    <p className="text-sm text-white/50 mt-1">{label}</p>
  </div>
);

const JourneyCard = ({
  step,
  title,
  description,
  action,
  onAction,
}) => (
  <div className="p-5 rounded-xl bg-[#020617] border border-white/5 space-y-4">
    <p className="text-xs text-cyan-400 font-medium">
      STEP {step}
    </p>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white/90">
        {title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed">
        {description}
      </p>
    </div>

    {action && (
      <button
        onClick={onAction}
        className="text-sm text-cyan-400 hover:text-cyan-300 transition"
      >
        {action} →
      </button>
    )}
  </div>
);
