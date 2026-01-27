import shuffleArray from "../../utils/shuffleArray";

/**
 * useExamShuffle
 *
 * Responsibility:
 * - Shuffle questions ONCE
 * - Shuffle options ONCE per question
 *
 * ❌ Does NOT:
 * - Handle answers
 * - Handle submit
 * - Handle navigation
 */
const useExamShuffle = (questions = []) => {
  const shuffleOnce = () => {
    return shuffleArray(questions).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options),
    }));
  };

  return {
    shuffleOnce,
  };
};

export default useExamShuffle;
