/**
 * ProfileLoader Component
 *
 * Displays a calm loading state for profile data
 */
const ProfileLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div
        className="
          flex flex-col items-center gap-4
          rounded-xl p-8
          border border-white/5
          bg-black/40
          shadow-[0_10px_30px_rgba(0,0,0,0.4)]
        "
      >
        {/* Subtle animated pulse */}
        <div
          className="
            w-10 h-10 rounded-full
            border border-cyan-400/40
            animate-pulse
          "
        />

        <p className="text-sm text-white/60 tracking-wide">
          Loading profile…
        </p>
      </div>
    </div>
  );
};

export default ProfileLoader;
