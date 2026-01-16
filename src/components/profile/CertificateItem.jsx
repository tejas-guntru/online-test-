// ==================== REACT ====================
// useState → to control paid-certificate popup visibility
import { useState } from "react";

// ==================== CERTIFICATE GENERATION ====================
// Generates downloadable PDF certificate
import { generateCertificate } from "../../utils/generateCertificate";

// ==================== FIREBASE ====================
import { db } from "../../firebase";

// Firestore helpers
// setDoc          → create public verification record
// doc             → reference document
// serverTimestamp → trusted server-issued timestamp
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// ==================== CONSTANTS ====================
// Minimum percentage required to be eligible for ANY certificate
const PASS_PERCENTAGE = 40;

/**
 * CertificateItem Component
 *
 * PURPOSE:
 * - Displays certificate eligibility for a single test attempt
 * - Handles certificate download (free)
 * - Handles payment gating (paid)
 * - Creates a public verification record for issued certificates
 *
 * USED IN:
 * - Profile → Certificate list section
 *
 * PROPS:
 * @param {Object} result
 *   • score
 *   • total
 *   • submittedAt
 *   • id (used as certificateId)
 *
 * @param {Object} test
 *   • title
 *
 * @param {Object} user
 *   • name
 *
 * @param {Object} certificateType
 *   • type   (completion / merit / excellence)
 *   • isFree (boolean)
 *   • price  (if paid)
 */
const CertificateItem = ({ result, test, user, certificateType }) => {
  // Controls visibility of payment-required popup
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // ==================== CALCULATIONS ====================
  // Calculate percentage score
  const percentage = (
    (result.score / result.total) *
    100
  ).toFixed(2);

  // Check if user passed minimum requirement
  const passed = percentage >= PASS_PERCENTAGE;

  /**
   * handleAction
   *
   * Triggered when user clicks:
   * - "Download Certificate" (free)
   * - "Unlock Certificate" (paid)
   *
   * Handles:
   * - Public certificate verification record creation
   * - Certificate PDF generation (FREE only)
   * - Payment popup for paid certificates
   */
  const handleAction = async () => {
    // Guard: not eligible
    if (!passed) return;

    // ==================== FREE CERTIFICATE FLOW ====================
    if (certificateType?.isFree) {
      // Stable & unique certificate ID
      const certificateId = result.id;

      try {
        /* ============================================================
           CREATE PUBLIC VERIFICATION SNAPSHOT
           ------------------------------------------------------------
           Stored in `certificates_public` collection
           Used by:
           - Certificate verification page
           - Employers / third-party validation
        ============================================================ */
        await setDoc(
          doc(db, "certificates_public", certificateId),
          {
            certificateId,
            userName: user.name,
            testTitle: test?.title || "Test",
            score: result.score,
            total: result.total,
            percentage,
            certificateType: certificateType.type,
            issuedAt: serverTimestamp(),
            issuedBy: "Online Test Platform",
            valid: true,
          }
        );

        /* ==================== GENERATE PDF CERTIFICATE ==================== */
        generateCertificate({
          studentName: user.name,
          testTitle: test?.title || "Test",
          score: result.score,
          total: result.total,
          percentage,
          issuedDate: result.submittedAt
            ? new Date(
                result.submittedAt.seconds * 1000
              ).toDateString()
            : new Date().toDateString(),
          certificateId,
        });
      } catch (err) {
        console.error("Certificate issue failed:", err);
        alert("Failed to generate certificate");
      }
    }
    // ==================== PAID CERTIFICATE FLOW ====================
    else {
      // Show payment-required popup
      setShowPaymentPopup(true);
    }
  };

  return (
    <>
      {/* ================= CERTIFICATE CARD =================
          Displays eligibility, score, and certificate type */}
      <div className="border p-4 rounded-lg flex justify-between items-center bg-white">
        <div>
          {/* Test Title */}
          <p className="font-semibold">
            {test?.title || "Test"}
          </p>

          {/* Score Summary */}
          <p className="text-sm text-gray-600">
            Score: {result.score}/{result.total} ({percentage}%)
          </p>

          {/* Eligibility Status */}
          <p
            className={`text-sm font-semibold ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {passed
              ? `${certificateType?.type} Certificate`
              : "Not Eligible for Certificate"}
          </p>

          {/* Paid / Free Indicator */}
          {passed && !certificateType?.isFree && (
            <p className="text-sm text-orange-600 mt-1">
              💰 Paid Certificate (₹{certificateType?.price})
            </p>
          )}

          {passed && certificateType?.isFree && (
            <p className="text-sm text-green-600 mt-1">
              ✔ Free Certificate
            </p>
          )}
        </div>

        {/* ================= ACTION BUTTON ================= */}
        {passed && (
          <button
            onClick={handleAction}
            className={`px-4 py-2 rounded text-white ${
              certificateType?.isFree
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {certificateType?.isFree
              ? "Download Certificate"
              : "Unlock Certificate"}
          </button>
        )}
      </div>

      {/* ================= PAYMENT REQUIRED POPUP =================
          Shown only for paid certificates */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Payment Required
            </h2>

            <p className="text-gray-700 text-center mb-4">
              This certificate is a <strong>paid certificate</strong>.
            </p>

            {/* Certificate Price */}
            <div className="border rounded p-3 mb-4 text-center">
              <p className="font-semibold">
                {certificateType?.type} Certificate
              </p>
              <p className="text-lg text-blue-600 font-bold">
                ₹{certificateType?.price}
              </p>
            </div>

            <p className="text-sm text-gray-500 text-center mb-4">
              Payment integration is coming soon.
            </p>

            {/* Popup Actions */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Close
              </button>

              <button
                disabled
                className="px-4 py-2 rounded bg-blue-400 text-white cursor-not-allowed"
              >
                Pay & Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificateItem;
