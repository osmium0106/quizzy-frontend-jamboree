
import React from "react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-bold text-white bg-quiz-primary px-3 py-1 rounded-full">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="font-bold text-white bg-gradient-to-r from-quiz-primary to-purple-500 px-3 py-1 rounded-full">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full h-6 bg-white rounded-full shadow-inner">
        <div
          className="h-6 bg-gradient-to-r from-quiz-primary to-purple-500 rounded-full transition-all duration-300 ease-in-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Add animated dots and characters for fun - grade 5 friendly */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-6 h-6 rounded-full bg-white top-0 flex items-center justify-center text-xs font-bold text-quiz-primary"
              style={{ 
                left: `${i * 20}%`, 
                opacity: progress > i * 20 ? 1 : 0,
                transform: progress > i * 20 ? 'scale(1)' : 'scale(0)',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
