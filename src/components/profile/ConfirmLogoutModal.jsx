// components/profile/ConfirmLogoutModal.jsx

import { motion, AnimatePresence } from "framer-motion";

const ConfirmLogoutModal = ({ open, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ================= BACKDROP ================= */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* ================= MODAL ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative w-[90%] max-w-sm
              rounded-xl p-6
              bg-[#020617]
              border border-white/5
            "
          >
            <h2 className="text-lg font-semibold text-white/90 mb-2">
              Log out?
            </h2>

            <p className="text-sm text-white/60 mb-6">
              You’ll be signed out of your account.
            </p>

            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={onCancel}
                className="
                  px-4 py-2 rounded-md
                  bg-white/5
                  text-white/70
                  hover:bg-white/10
                "
              >
                Cancel
              </motion.button>

              {/* Confirm Logout */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={onConfirm}
                className="
                  px-4 py-2 rounded-md
                  bg-transparent
                  border border-red-500/30
                  text-red-400
                  hover:border-red-400/60
                  hover:text-red-300
                "
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmLogoutModal;
