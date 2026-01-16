// ==================== CHILD COMPONENT ====================
// CertificateItem → Renders certificate info for a single test attempt
import CertificateItem from "./CertificateItem";

/**
 * CertificateList Component
 *
 * PURPOSE:
 * - Acts as a wrapper/list for all certificate items
 * - Iterates over user test results
 * - Renders one CertificateItem per test attempt
 *
 * USED IN:
 * - Profile page → Certificates section
 *
 * PROPS:
 * @param {Array} results
 *   • List of result objects (one per test attempt)
 *
 * @param {Object} testsMap
 *   • Map of testId → test data
 *   • Used to fetch test title and certificate rules
 *
 * @param {Object} user
 *   • Logged-in user information
 */
const CertificateList = ({ results, testsMap, user }) => {
  // ==================== EMPTY STATE ====================
  // Shown when the user has not attempted any tests
  if (results.length === 0) {
    return (
      <p className="text-gray-500">
        No tests attempted yet.
      </p>
    );
  }

  return (
    /* ==================== CERTIFICATE LIST ====================
       Maps each test result to a CertificateItem */
    <div className="space-y-4">
      {results.map((r) => (
        <CertificateItem
          key={r.id}                 // Unique key per certificate
          result={r}                 // Result data (score, total, etc.)
          test={testsMap[r.testId]}  // Corresponding test info
          user={user}                // User info (name, etc.)
        />
      ))}
    </div>
  );
};

export default CertificateList;
