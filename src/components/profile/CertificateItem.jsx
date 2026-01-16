import { useState } from "react";
import { generateCertificate } from "../../utils/generateCertificate";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const PASS_PERCENTAGE = 40;

const CertificateItem = ({ result, test, user, certificateType }) => {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const percentage = (
    (result.score / result.total) *
    100
  ).toFixed(2);

  const passed = percentage >= PASS_PERCENTAGE;

  const handleAction = async () => {
    if (!passed) return;

    // ✅ FREE CERTIFICATE
    if (certificateType?.isFree) {
      const certificateId = result.id; // stable & unique

      try {
        /* ================= CREATE PUBLIC VERIFICATION SNAPSHOT ================= */
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

        /* ================= GENERATE PDF ================= */
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
    // ❌ PAID CERTIFICATE (NO WRITE YET)
    else {
      setShowPaymentPopup(true);
    }
  };

  return (
    <>
      {/* ================= CERTIFICATE CARD ================= */}
      <div className="border p-4 rounded-lg flex justify-between items-center bg-white">
        <div>
          <p className="font-semibold">
            {test?.title || "Test"}
          </p>

          <p className="text-sm text-gray-600">
            Score: {result.score}/{result.total} ({percentage}%)
          </p>

          <p
            className={`text-sm font-semibold ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {passed
              ? `${certificateType?.type} Certificate`
              : "Not Eligible for Certificate"}
          </p>

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

      {/* ================= PAYMENT REQUIRED POPUP ================= */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Payment Required
            </h2>

            <p className="text-gray-700 text-center mb-4">
              This certificate is a <strong>paid certificate</strong>.
            </p>

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
