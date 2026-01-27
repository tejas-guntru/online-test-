import { motion } from "framer-motion";
import CertificateVerificationBox from "../components/dashboard/CertificateVerificationBox";

const CertificationVerification = () => {
  return (
    <div className="pt-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">

        {/* ================= PAGE CONTEXT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">
            Certificate Verification
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Verify certificates issued by TestGenius securely and instantly.
          </p>
        </motion.div>

        {/* ================= VERIFICATION BOX ================= */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6, ease: "easeOut" }}
          className="
            relative
            bg-black/40
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-6 md:p-8
            shadow-[0_0_30px_rgba(34,211,238,0.18)]
          "
        >
          <CertificateVerificationBox />
        </motion.div>

      </div>
    </div>
  );
};

export default CertificationVerification;
