import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { generateCertificate } from "../../utils/generateCertificate";
import { PASS_PERCENTAGE } from "../../constants";

const CertificateItem = ({ result, test, user, certificateType }) => {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const percentage = ((result.score / result.total) * 100).toFixed(2);
  const passed = percentage >= PASS_PERCENTAGE;

  const handleAction = async () => {
    if (!passed) return;

    if (certificateType?.isFree) {
      const certificateId = result.id;

      try {
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

        generateCertificate({
          studentName: user.name,
          testTitle: test?.title || "Test",
          score: result.score,
          total: result.total,
          percentage,
          issuedDate: result.submittedAt
            ? new Date(result.submittedAt.seconds * 1000).toDateString()
            : new Date().toDateString(),
          certificateId,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      setShowPaymentPopup(true);
    }
  };

  return (
    <>
      {/* ================= CERTIFICATE CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          flex justify-between items-center gap-4
          rounded-xl p-5
          bg-[#020617]
          border border-white/5
        "
      >
        <div className="space-y-1">
          {/* Test Title */}
          <p className="text-white/90 font-medium">
            {test?.title || "Test"}
          </p>

          {/* Score */}
          <p className="text-sm text-white/55">
            Score: {result.score}/{result.total} ({percentage}%)
          </p>

          {/* Eligibility */}
          <p
            className={`text-sm font-semibold ${
              passed ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {passed
              ? `${certificateType?.type} Certificate`
              : "Not Eligible for Certificate"}
          </p>

          {/* Paid / Free Indicator */}
          {passed && !certificateType?.isFree && (
            <p className="text-sm text-orange-400/90">
              Paid Certificate • ₹{certificateType?.price}
            </p>
          )}

          {passed && certificateType?.isFree && (
            <p className="text-sm text-emerald-400/90">
              Free Certificate
            </p>
          )}
        </div>

        {/* ================= ACTION BUTTON ================= */}
        {passed && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={handleAction}
            className="
              px-4 py-2 rounded-md text-sm font-medium
              bg-transparent
              border border-white/10
              text-white/80
              hover:border-cyan-400/60
              hover:text-cyan-300
            "
          >
            {certificateType?.isFree
              ? "Download Certificate"
              : "Unlock Certificate"}
          </motion.button>
        )}
      </motion.div>

      {/* ================= PAYMENT POPUP ================= */}
      <AnimatePresence>
        {showPaymentPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                w-[90%] max-w-md
                rounded-xl p-6
                bg-[#020617]
                border border-white/5
              "
            >
              <h2 className="text-lg font-semibold text-white/90 text-center mb-2">
                Payment Required
              </h2>

              <p className="text-sm text-white/60 text-center mb-4">
                This is a paid certificate.
              </p>

              <div className="border border-white/10 rounded-lg p-4 text-center mb-4">
                <p className="text-white/80 font-medium">
                  {certificateType?.type} Certificate
                </p>
                <p className="text-cyan-400 text-xl font-semibold">
                  ₹{certificateType?.price}
                </p>
              </div>

              <p className="text-xs text-white/45 text-center mb-5">
                Payment integration coming soon.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowPaymentPopup(false)}
                  className="
                    px-4 py-2 rounded-md
                    bg-white/5
                    text-white/70
                    hover:bg-white/10
                    transition
                  "
                >
                  Close
                </button>

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
    </>
  );
};

export default CertificateItem;
