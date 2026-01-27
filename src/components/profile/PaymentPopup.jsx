/**
 * PaymentPopup Component
 *
 * Displays a payment-required modal for paid certificates
 */

import { motion, AnimatePresence } from "framer-motion";

const PaymentPopup = ({ open, certificate, onClose }) => {
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
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* ================= MODAL ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative
              w-[90%] max-w-md
              rounded-xl p-6
              bg-[#020617]
              border border-white/5
            "
          >
            {/* ================= HEADER ================= */}
            <h2 className="text-lg font-semibold mb-3 text-center text-white/90">
              Payment Required
            </h2>

            {/* ================= DESCRIPTION ================= */}
            <p className="text-sm text-white/65 text-center mb-4">
              This certificate requires payment to unlock.
            </p>

            {/* ================= PRICE ================= */}
            <div className="mb-4 text-center">
              <p className="text-xs text-white/45 mb-1">
                Certificate Price
              </p>
              <p className="text-2xl font-semibold text-cyan-400">
                ₹{certificate?.price}
              </p>
            </div>

            {/* ================= INFO ================= */}
            <p className="text-xs text-white/45 text-center mb-5">
              Payment integration is coming soon.
            </p>

            {/* ================= ACTIONS ================= */}
            <div className="flex justify-center gap-3">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="
                  px-4 py-2 rounded-md
                  bg-white/5
                  text-white/70
                  hover:bg-white/10
                "
              >
                Close
              </motion.button>

              <button
                disabled
                className="
                  px-4 py-2 rounded-md
                  bg-cyan-500/15
                  text-cyan-300
                  cursor-not-allowed
                "
              >
                Pay & Unlock
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentPopup;
