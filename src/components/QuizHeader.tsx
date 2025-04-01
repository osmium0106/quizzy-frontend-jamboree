
import React from "react";
import ProgressBar from "./ProgressBar";

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  score,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-quiz-primary">Quizzy</h1>
          <span className="ml-2 px-3 py-1 bg-quiz-light text-quiz-primary rounded-full text-sm font-medium">
            Live
          </span>
        </div>
        <div className="bg-quiz-light px-4 py-2 rounded-full flex items-center">
          <span className="font-bold text-quiz-primary mr-1">Score:</span>
          <span className="font-bold text-quiz-dark">{score}</span>
        </div>
      </div>
      
      <ProgressBar
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default QuizHeader;
