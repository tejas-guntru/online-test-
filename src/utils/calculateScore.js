/**
 * calculateScore
 *
 * @param {Array} questions - list of question objects
 * @param {Object} answers - { questionId: selectedOptionIndex }
 *
 * @returns {Object} { score, total, percentage }
 */
const calculateScore = (questions, answers) => {
  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.correctOptionIndex) {
      score++;
    }
  });

  const total = questions.length;
  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    score,
    total,
    percentage,
  };
};

export default calculateScore;
