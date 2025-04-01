
import React from "react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span className="font-bold text-white bg-quiz-primary px-3 py-1 rounded-full">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="font-bold text-white bg-gradient-to-r from-quiz-primary to-purple-500 px-3 py-1 rounded-full">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full h-4 bg-white rounded-full shadow-inner">
        <div
          className="h-4 bg-gradient-to-r from-quiz-primary to-purple-500 rounded-full transition-all duration-300 ease-in-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Add animated dots for fun */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-3 h-3 rounded-full bg-white top-0.5"
              style={{ 
                left: `${i * 25}%`, 
                opacity: progress > i * 25 ? 1 : 0,
                transform: progress > i * 25 ? 'scale(1)' : 'scale(0)',
                transition: 'all 0.3s ease-in-out'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
