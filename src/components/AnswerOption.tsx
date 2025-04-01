
import React from "react";
import { Check, X } from "lucide-react";

interface AnswerOptionProps {
  option: string;
  index: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isAnswered: boolean;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  option,
  index,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  onSelect,
  disabled = false,
}) => {
  const optionLabels = ["A", "B", "C", "D"];
  const isSelected = selectedAnswer === index;
  const isCorrect = correctAnswer === index;

  let bgColor = "bg-white hover:bg-quiz-light";
  let borderColor = "border-gray-200";
  let textColor = "text-quiz-dark";
  let cursorClass = disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer";

  if (isAnswered) {
    if (isSelected) {
      if (isCorrect) {
        bgColor = "bg-quiz-correct";
        borderColor = "border-quiz-correct";
        textColor = "text-white";
      } else {
        bgColor = "bg-quiz-incorrect";
        borderColor = "border-quiz-incorrect";
        textColor = "text-white";
      }
    } else if (isCorrect) {
      bgColor = "bg-quiz-correct";
      borderColor = "border-quiz-correct";
      textColor = "text-white";
    }
  }

  return (
    <button
      onClick={() => !isAnswered && !disabled && onSelect(index)}
      disabled={isAnswered || disabled}
      className={`w-full p-4 mb-3 flex items-center border-2 rounded-xl ${bgColor} ${borderColor} ${textColor} ${cursorClass} transition-all duration-200 transform hover:scale-[1.01]`}
    >
      <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-quiz-light text-quiz-primary font-bold">
        {optionLabels[index]}
      </div>
      <div className="flex-1 text-left">{option}</div>
      {isAnswered && (
        <div className="ml-2">
          {isCorrect ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            isSelected && <X className="w-6 h-6 text-white" />
          )}
        </div>
      )}
    </button>
  );
};

export default AnswerOption;
