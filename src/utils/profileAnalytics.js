// utils/profileAnalytics.js

export const calculateAnalytics = (results) => {
  const totalTests = results.length;

  const totalScore = results.reduce(
    (sum, r) => sum + r.score,
    0
  );

  const totalQuestions = results.reduce(
    (sum, r) => sum + r.total,
    0
  );

  const avgPercentage =
    totalQuestions > 0
      ? ((totalScore / totalQuestions) * 100).toFixed(2)
      : "0.00";

  return {
    totalTests,
    totalScore,
    totalQuestions,
    avgPercentage,
  };
};
