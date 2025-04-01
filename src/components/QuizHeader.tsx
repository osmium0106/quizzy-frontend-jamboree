
import React from "react";
import ProgressBar from "./ProgressBar";
import { Star } from "lucide-react";

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-quiz-primary to-purple-500 text-transparent bg-clip-text">Quizzy</h1>
          <span className="ml-2 px-3 py-1 bg-quiz-light text-quiz-primary rounded-full text-sm font-bold animate-bounce-slow">
            Fun Time!
          </span>
        </div>
        <div className="bg-gradient-to-r from-quiz-primary to-purple-500 px-5 py-3 rounded-full flex items-center shadow-lg transform hover:scale-105 transition-transform">
          <Star className="text-yellow-300 mr-1" size={24} />
          <span className="font-bold text-white mr-1">Score:</span>
          <span className="font-bold text-white text-xl">{score}</span>
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
