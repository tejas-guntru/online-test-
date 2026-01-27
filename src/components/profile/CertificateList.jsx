// ==================== CHILD COMPONENT ====================
import { motion } from "framer-motion";
import CertificateItem from "./CertificateItem";

/**
 * CertificateList Component
 *
 * PURPOSE:
 * - Wrapper for all certificate items
 * - Renders one CertificateItem per test attempt
 *
 * USED IN:
 * - Profile → Certificates section
 */
const CertificateList = ({ results, testsMap, user }) => {
  // ==================== EMPTY STATE ====================
  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          flex flex-col items-center justify-center
          rounded-xl p-8
          bg-[#020617]
          border border-white/5
          text-center
        "
      >
        <p className="text-white/70 text-sm">
          You haven’t attempted any tests yet.
        </p>
        <p className="text-white/45 text-xs mt-1">
          Certificates will appear here once you complete a test.
        </p>
      </motion.div>
    );
  }

  return (
    /* ==================== CERTIFICATE LIST ==================== */
    <motion.div
      initial="hidden"
      animate="visible"
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
      {results.map((r) => (
        <motion.div
          key={r.id}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <CertificateItem
            result={r}
            test={testsMap[r.testId]}
            user={user}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CertificateList;
