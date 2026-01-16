export function decideCertificate({
  percentage,
  certificateConfig,
}) {
  if (!certificateConfig?.enabled) {
    return null;
  }

  const { completion, merit, excellence } =
    certificateConfig;

  // 🥇 Highest tier first
  if (
    excellence?.enabled &&
    percentage >= excellence.minPercentage
  ) {
    return "excellence";
  }

  if (
    merit?.enabled &&
    percentage >= merit.minPercentage
  ) {
    return "merit";
  }

  if (
    completion?.enabled &&
    percentage >= completion.minPercentage
  ) {
    return "completion";
  }

  return null;
}
