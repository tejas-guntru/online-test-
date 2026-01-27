/**
 * ProfileLoader Component
 *
 * Displays a calm loading state for profile data
 */

import { motion } from "framer-motion";

const ProfileLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          flex flex-col items-center gap-4
          rounded-xl p-8
          border border-white/5
          bg-black/40
        "
      >
        {/* ================= LOADER RING ================= */}
        <motion.div
          className="
            w-10 h-10 rounded-full
            border border-cyan-400/40
          "
          animate={{
            rotate: 360,
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "linear",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-sm text-white/60 tracking-wide"
        >
          Loading profile…
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProfileLoader;
