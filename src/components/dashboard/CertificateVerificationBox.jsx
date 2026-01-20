// ==================== REACT CORE ====================
import { useState } from "react";

// ==================== ROUTING ====================
import { useNavigate } from "react-router-dom";

const CertificateVerificationBox = () => {
  const navigate = useNavigate();

  const [certId, setCertId] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    const trimmedId = certId.trim();

    if (!trimmedId) {
      setError("Please enter a valid Certificate ID");
      return;
    }

    setError("");
    navigate(`/verify/${trimmedId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleVerify();
  };

  return (
    <div
      className="
        rounded-xl p-6 mb-6
        bg-[#020617]
        border border-white/5
        shadow-[0_12px_30px_rgba(0,0,0,0.45)]
      "
    >
      {/* ================= HEADER ================= */}
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2 text-white/90">
        🔐 Verify Certificate
      </h2>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-white/60 mb-5">
        Enter a Certificate ID to verify its authenticity.
      </p>

      {/* ================= INPUT & ACTION ================= */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Certificate ID Input */}
        <input
          type="text"
          placeholder="e.g. 1sAER98nVDbbkeuoTxdl"
          value={certId}
          onChange={(e) => {
            setCertId(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          className={`
            flex-1 px-3 py-3 rounded-md
            bg-black/40
            border
            text-white/85
            placeholder-white/40
            focus:outline-none
            transition
            ${
              error
                ? "border-red-400/60 focus:border-red-400 focus:shadow-[0_0_0_1px_rgba(248,113,113,0.35)]"
                : "border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
            }
          `}
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="
            px-6 py-3 rounded-md
            text-sm font-medium
            bg-transparent
            border border-white/10
            text-white/80
            transition-all duration-200
            hover:border-cyan-400
            hover:text-cyan-300
            hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]
          "
        >
          Verify
        </button>
      </div>

      {/* ================= ERROR MESSAGE ================= */}
      {error && (
        <p className="text-sm text-red-400 mt-2">
          {error}
        </p>
      )}

      {/* ================= TRUST FOOTER ================= */}
      <p className="text-xs text-white/45 mt-4 flex items-center gap-1">
        🔎 Verification is public and does not require login.
      </p>
    </div>
  );
};

export default CertificateVerificationBox;
