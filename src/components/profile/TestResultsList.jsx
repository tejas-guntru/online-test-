// components/profile/TestResultsList.jsx

import { motion } from "framer-motion";
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
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-lg font-semibold mb-4 text-white/90"
      >
        Test Results
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className="space-y-4"
      >
        {results.map((r) => {
          const test = testsMap[r.testId];
          const tier = r.certificateEarned;
          const cert = tier && test?.certificate?.[tier];

          /* ================= NO CERTIFICATE ================= */
          if (!tier) {
            return (
              <motion.div
                key={r.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
                  rounded-xl p-5
                  bg-[#020617]
                  border border-white/5
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
              </motion.div>
            );
          }

          /* ================= CERTIFICATE EARNED ================= */
          return (
            <motion.div
              key={r.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="
                flex justify-between items-center gap-4
                rounded-xl p-5
                bg-[#020617]
                border border-white/5
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
                  <p className="text-sm text-orange-400/90">
                    Paid Certificate • ₹{cert.price}
                  </p>
                ) : (
                  <p className="text-sm text-emerald-400/90">
                    Free Certificate
                  </p>
                )}
              </div>

              {/* ================= ACTION ================= */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
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
                  hover:border-cyan-400/60
                  hover:text-cyan-300
                "
              >
                {cert?.isPaid ? "Unlock" : "Download"}
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default TestResultsList;
