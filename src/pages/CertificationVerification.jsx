import CertificateVerificationBox from "../components/dashboard/CertificateVerificationBox";

const CertificationVerification = () => {
  return (
    <div className="pt-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* ================= PAGE CONTEXT ================= */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">
            Certificate Verification
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Verify certificates issued by TestGenius securely and instantly.
          </p>
        </div>

        {/* ================= VERIFICATION BOX ================= */}
        <div
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
        </div>
      </div>
    </div>
  );
};

export default CertificationVerification;
