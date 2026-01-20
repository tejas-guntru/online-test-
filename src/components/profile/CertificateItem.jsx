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
        alert("Failed to generate certificate");
      }
    } else {
      setShowPaymentPopup(true);
    }
  };

  return (
    <>
      {/* ================= CERTIFICATE CARD ================= */}
      <div
        className="
          flex justify-between items-center gap-4
          rounded-xl p-5
          bg-[#020617]
          border border-white/5
          shadow-[0_10px_30px_rgba(0,0,0,0.4)]
        "
      >
        <div className="space-y-1">
          {/* Test Title */}
          <p className="text-white/85 font-medium">
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
            <p className="text-sm text-orange-400">
              Paid Certificate • ₹{certificateType?.price}
            </p>
          )}

          {passed && certificateType?.isFree && (
            <p className="text-sm text-emerald-400">
              Free Certificate
            </p>
          )}
        </div>

        {/* ================= ACTION BUTTON ================= */}
        {passed && (
          <button
            onClick={handleAction}
            className="
              px-4 py-2 rounded-md text-sm font-medium
              bg-transparent
              border border-white/10
              text-white/80
              transition-all duration-200
              hover:border-cyan-400
              hover:text-cyan-300
              hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]
            "
          >
            {certificateType?.isFree
              ? "Download Certificate"
              : "Unlock Certificate"}
          </button>
        )}
      </div>

      {/* ================= PAYMENT POPUP ================= */}
      {showPaymentPopup && (
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
      )}
    </>
  );
};
