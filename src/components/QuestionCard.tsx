
import React, { useState, useEffect } from "react";
import AnswerOption from "./AnswerOption";
import { QuizQuestion } from "../data/quizData";
import Timer from "./Timer";
import { useToast } from "@/hooks/use-toast";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSelected: (isCorrect: boolean) => void;
  onTimeUp: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerSelected,
  onTimeUp,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { toast } = useToast();

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsAnswered(true);
    setIsTimerActive(false);
    
    const isCorrect = index === question.correctAnswer;
    
    setTimeout(() => {
      onAnswerSelected(isCorrect);
      
      toast({
        title: isCorrect ? "Correct!" : "Incorrect!",
        description: isCorrect 
          ? "Great job! You got it right!" 
          : `The correct answer was: ${question.options[question.correctAnswer]}`,
        variant: isCorrect ? "default" : "destructive",
      });
    }, 1500);
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    
    toast({
      title: "Time's up!",
      description: `The correct answer was: ${question.options[question.correctAnswer]}`,
      variant: "destructive",
    });
    
    // Immediately end the quiz when time is up
    onTimeUp();
  };

  // Reset component state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsTimerActive(true);
  }, [question.id]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 flex justify-between items-center bg-quiz-primary text-white">
        <h2 className="text-xl font-bold">Question {question.id}</h2>
        <Timer 
          initialTime={question.timeLimit} 
          onTimeUp={handleTimeUp} 
          isActive={isTimerActive} 
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-quiz-dark">
          {question.question}
        </h3>
        
        {question.image && (
          <div className="my-4">
            <img 
              src={question.image} 
              alt="Question" 
              className="max-w-full h-auto rounded-lg mx-auto" 
            />
          </div>
        )}
        
        <div className="mt-6">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              option={option}
              index={index}
              selectedAnswer={selectedAnswer}
              correctAnswer={question.correctAnswer}
              isAnswered={isAnswered}
              onSelect={handleAnswerSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
