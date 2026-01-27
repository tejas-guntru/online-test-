// components/profile/AvatarSection.jsx

import { motion } from "framer-motion";

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
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative"
      >
        <img
          src={avatar}
          alt="avatar"
          className="
            w-24 h-24 rounded-full
            border border-cyan-400/30
            shadow-[0_0_18px_rgba(34,211,238,0.25)]
          "
        />

        {/* Soft glow ring */}
        <div
          className="
            absolute inset-0 rounded-full
            blur-xl
            bg-cyan-400/15
            -z-10
          "
        />
      </motion.div>

      {/* ACTION */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400">
          Profile Avatar
        </p>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={onRegenerate}
          className="
            inline-flex items-center gap-2
            px-4 py-2
            text-sm font-medium
            rounded-md
            bg-cyan-500/10
            text-cyan-300
            border border-cyan-400/25
            hover:bg-cyan-500/20
            hover:border-cyan-400/40
            hover:shadow-[0_0_14px_rgba(34,211,238,0.35)]
            transition
          "
        >
          🔄 Generate New Avatar
        </motion.button>
      </div>
    </div>
  );
};

export default AvatarSection;
