/**
 * PaymentPopup Component
 *
 * Displays a payment-required modal for paid certificates
 */
const PaymentPopup = ({ open, certificate, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="
          w-[90%] max-w-md
          rounded-xl p-6
          bg-[#020617]
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
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
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-md
              bg-white/5
              text-white/70
              transition
              hover:bg-white/10
            "
          >
            Close
          </button>

          <button
            disabled
            className="
              px-4 py-2 rounded-md
              bg-cyan-500/20
              text-cyan-300
              cursor-not-allowed
            "
          >
            Pay & Unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
