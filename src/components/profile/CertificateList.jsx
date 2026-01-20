// ==================== CHILD COMPONENT ====================
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
      <div
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
      </div>
    );
  }

  return (
    /* ==================== CERTIFICATE LIST ==================== */
    <div className="space-y-4">
      {results.map((r) => (
        <CertificateItem
          key={r.id}
          result={r}
          test={testsMap[r.testId]}
          user={user}
        />
      ))}
    </div>
  );
};

export default CertificateList;
