/**
 * PaymentPopup Component
 *
 * PURPOSE:
 * - Displays a modal when a paid certificate is selected
 * - Shows certificate price
 * - Blocks download until payment integration is added
 *
 * USED IN:
 * - Profile page
 *
 * PROPS:
 * @param {boolean} open        - Whether popup is visible
 * @param {Object} certificate - Selected certificate object
 * @param {Function} onClose   - Close popup callback
 */
const PaymentPopup = ({ open, certificate, onClose }) => {
  // Do not render if popup is closed
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        
        {/* ================= HEADER ================= */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Payment Required
        </h2>

        {/* ================= DESCRIPTION ================= */}
        <p className="text-center mb-3">
          This certificate requires payment.
        </p>

        {/* ================= PRICE ================= */}
        <p className="text-center font-bold text-lg mb-4">
          ₹{certificate?.price}
        </p>

        {/* ================= INFO ================= */}
        <p className="text-sm text-gray-500 text-center mb-4">
          Payment integration coming soon.
        </p>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Close
          </button>

          <button
            disabled
            className="px-4 py-2 bg-blue-400 text-white rounded cursor-not-allowed"
          >
            Pay & Unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
