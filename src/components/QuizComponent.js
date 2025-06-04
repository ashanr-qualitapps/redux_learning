import React, { useState } from 'react';

/**
 * Interactive quiz component
 * @param {Object} props
 * @param {string} props.question - Quiz question
 * @param {Array} props.options - Array of options
 * @param {number} props.correctAnswer - Index of the correct answer
 * @param {string} props.explanation - Explanation of the answer
 */
const QuizComponent = ({ question, options, correctAnswer, explanation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const isCorrect = selectedOption === correctAnswer;

  return (
    <div className="interactive-quiz">
      <h3>Quick Quiz</h3>
      <div className="quiz-question">{question}</div>

      <div className="quiz-options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`quiz-option ${
              showFeedback && selectedOption === index
                ? isCorrect
                  ? 'selected-correct'
                  : 'selected-incorrect'
                : ''
            }`}
            onClick={() => !showFeedback && handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>

      {showFeedback && (
        <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          <p>{explanation}</p>
          <button onClick={resetQuiz}>Try Another Question</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
