// components/profile/TestResultsList.jsx

import RetakeRequestButton from "../retake/RetakeRequestButton";

const CERTIFICATE_META = {
  completion: { label: "Completion Certificate", icon: "🏅" },
  merit: { label: "Merit Certificate", icon: "🥈" },
  excellence: { label: "Excellence Certificate", icon: "🥇" },
};

const TestResultsList = ({
  results,
  testsMap,
  userInfo,
  onFreeDownload,
  onPaidClick,
}) => {
  return (
    <>
      {/* ================= HEADER ================= */}
      <h2 className="text-lg font-semibold mb-4 text-white/90">
        Test Results
      </h2>

      <div className="space-y-4">
        {results.map((r) => {
          const test = testsMap[r.testId];
          const tier = r.certificateEarned;
          const cert = tier && test?.certificate?.[tier];

          /* ================= NO CERTIFICATE ================= */
          if (!tier) {
            return (
              <div
                key={r.id}
                className="
                  rounded-xl p-5
                  bg-[#020617]
                  border border-white/5
                  shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                "
              >
                <p className="text-white/85 font-medium">
                  {test?.title}
                </p>

                <p className="text-sm text-white/55 mb-3">
                  Score: {r.score}/{r.total}
                </p>

                <RetakeRequestButton
                  result={r}
                  user={userInfo}
                />
              </div>
            );
          }

          /* ================= CERTIFICATE EARNED ================= */
          return (
            <div
              key={r.id}
              className="
                flex justify-between items-center gap-4
                rounded-xl p-5
                bg-[#020617]
                border border-white/5
                shadow-[0_10px_30px_rgba(0,0,0,0.4)]
              "
            >
              <div className="space-y-1">
                <p className="text-white/85 font-medium">
                  {test?.title}
                </p>

                <p className="text-sm text-white/65">
                  {CERTIFICATE_META[tier].icon}{" "}
                  {CERTIFICATE_META[tier].label}
                </p>

                {cert?.isPaid ? (
                  <p className="text-sm text-orange-400">
                    Paid Certificate • ₹{cert.price}
                  </p>
                ) : (
                  <p className="text-sm text-emerald-400">
                    Free Certificate
                  </p>
                )}
              </div>

              {/* ================= ACTION ================= */}
              <button
                onClick={() =>
                  cert?.isPaid
                    ? onPaidClick(r, cert, test)
                    : onFreeDownload(r, test)
                }
                className="
                  px-4 py-2 rounded-md
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
                {cert?.isPaid ? "Unlock" : "Download"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TestResultsList;
