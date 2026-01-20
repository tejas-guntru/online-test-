/**
 * DashboardLoader Component
 *
 * Displays a calm loading state for dashboard data
 */
const DashboardLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div
        className="
          flex flex-col items-center gap-4
          rounded-xl p-8
          bg-black/40
          border border-white/5
          shadow-[0_10px_30px_rgba(0,0,0,0.4)]
        "
      >
        {/* Subtle pulse indicator */}
        <div
          className="
            w-10 h-10 rounded-full
            border border-cyan-400/40
            animate-pulse
          "
        />

        <p className="text-sm text-white/60 tracking-wide">
          Loading dashboard…
        </p>
      </div>
    </div>
  );
};

export default DashboardLoader;
