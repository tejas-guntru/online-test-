import CertificateItem from "./CertificateItem";

const CertificateList = ({ results, testsMap, user }) => {
  if (results.length === 0) {
    return (
      <p className="text-gray-500">
        No tests attempted yet.
      </p>
    );
  }

  return (
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
