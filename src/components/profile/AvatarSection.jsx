// components/profile/AvatarSection.jsx

const AvatarSection = ({ avatar, onRegenerate }) => {
  return (
    <div
      className="
        flex items-center gap-6
        p-6
        rounded-xl
        bg-[#020617]
        border border-white/5
      "
    >
      {/* AVATAR */}
      <div className="relative">
        <img
          src={avatar}
          alt="avatar"
          className="
            w-24 h-24 rounded-full
            border border-cyan-400/40
            shadow-[0_0_25px_rgba(34,211,238,0.35)]
          "
        />

        {/* Glow ring */}
        <div
          className="
            absolute inset-0 rounded-full
            blur-xl
            bg-cyan-400/20
            -z-10
          "
        />
      </div>

      {/* ACTION */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400">
          Profile Avatar
        </p>

        <button
          onClick={onRegenerate}
          className="
            inline-flex items-center
            px-4 py-2
            text-sm font-medium
            rounded-md
            bg-cyan-500/15
            text-cyan-300
            border border-cyan-400/30
            hover:bg-cyan-500/25
            hover:border-cyan-400
            hover:shadow-[0_0_18px_rgba(34,211,238,0.5)]
            transition
          "
        >
          🔄 Generate New Avatar
        </button>
      </div>
    </div>
  );
};

export default AvatarSection;
