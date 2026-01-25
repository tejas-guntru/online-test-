// ==================== REACT CORE ====================
import { useEffect, useState } from "react";

// ==================== ROUTING ====================
import { useParams } from "react-router-dom";

// ==================== FIREBASE ====================
import { doc, getDoc } from "firebase/firestore";

// ==================== FIREBASE CONFIG ====================
import { db } from "../firebase";

// ==================== BRAND ASSET ====================
import tgLogo from "../assets/tg-logo.png";

/**
 * VerifyCertificate Component
 * Public-facing certificate verification page
 * Route: /verify/:certificateId
 */
const VerifyCertificate = () => {
  const { certificateId } = useParams();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [cert, setCert] = useState(null);
  const [issuedIST, setIssuedIST] = useState("");
  const [issuedUTC, setIssuedUTC] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const certRef = doc(db, "certificates", certificateId);
        const certSnap = await getDoc(certRef);

        if (!certSnap.exists()) {
          setNotFound(true);
          return;
        }

        const certData = certSnap.data();
        setCert(certData);

        if (certData.issuedAt?.seconds) {
          const date = new Date(certData.issuedAt.seconds * 1000);

          setIssuedIST(
            date.toLocaleString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            })
          );

          setIssuedUTC(
            date.toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "UTC",
            })
          );
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (certificateId) verify();
    else {
      setNotFound(true);
      setLoading(false);
    }
  }, [certificateId]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Verifying certificate…
      </div>
    );
  }

  /* ================= INVALID ================= */
  if (notFound || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">
        ❌ Invalid or unknown certificate
      </div>
    );
  }

  /* ================= VERIFIED ================= */
  return (
    <div
      className="
        min-h-screen flex items-center justify-center p-6
        bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)]
        relative overflow-hidden
      "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2
          w-[600px] h-[600px]
          bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-200px]
          w-[500px] h-[500px]
          bg-violet-600/20 rounded-full blur-[160px]" />
      </div>

      {/* GLASS CARD */}
      <div
        className="
          relative z-10
          max-w-md w-full
          rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-[0_0_40px_rgba(34,211,238,0.25)]
          p-6 text-white
        "
      >
        {/* BRANDING */}
        <div className="flex flex-col items-center mb-4">
          <img src={tgLogo} alt="TG Logo" className="h-14 mb-2" />
          <h2 className="text-lg font-semibold tracking-wide">
            TERIGO
          </h2>
          <p className="text-xs text-cyan-300">
            Official Certificate Verification
          </p>
        </div>

        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <h1 className="text-xl font-bold text-center mb-4">
          ✅ Certificate Verified
        </h1>

        {/* DETAILS */}
        <div className="space-y-3 text-sm text-gray-200">
          <p>
            <strong>Certificate ID</strong><br />
            <span className="break-all text-cyan-300">
              {certificateId}
            </span>
          </p>

          <p>
            <strong>Student</strong><br />
            {cert.studentName || "—"}
          </p>

          <p>
            <strong>Test</strong><br />
            {cert.testTitle || "—"}
          </p>

          <p>
            <strong>Certificate Type</strong><br />
            {cert.certificateType || "—"}
          </p>

          <p>
            <strong>Score</strong><br />
            {cert.percentage ?? "—"}%
          </p>

          <p>
            <strong>Issued On</strong><br />
            {issuedIST} (IST)<br />
            {issuedUTC} (UTC)
          </p>
        </div>

        <p className="mt-6 text-center text-green-400 font-semibold">
          ✔ This certificate is authentic and valid
        </p>
      </div>
    </div>
  );
};

export default VerifyCertificate;
