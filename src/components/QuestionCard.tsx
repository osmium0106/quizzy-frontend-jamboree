
import React, { useState, useEffect } from "react";
import AnswerOption from "./AnswerOption";
import { QuizQuestion } from "../data/quizData";
import Timer from "./Timer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Play, Clock } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSelected: (isCorrect: boolean) => void;
  onTimeUp: () => void;
  isLastQuestion?: boolean;
  quizStarted: boolean;
  onQuizStart: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerSelected,
  onTimeUp,
  isLastQuestion = false,
  quizStarted,
  onQuizStart,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset timer state when question changes
    setIsTimerActive(quizStarted);
  }, [question.id, quizStarted]);

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

  const handleQuizStart = () => {
    onQuizStart();
    setIsTimerActive(true);
  };

  // Reset component state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question.id]);

  const renderSubmitButton = () => {
    if (isLastQuestion && !isAnswered) {
      return (
        <Button
          onClick={() => handleAnswerSelect(selectedAnswer || 0)}
          disabled={selectedAnswer === null}
          className="mt-6 w-full bg-quiz-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
        >
          Submit Quiz
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 flex justify-between items-center bg-quiz-primary text-white">
        <h2 className="text-xl font-bold">Question {question.id}</h2>
        {!quizStarted ? (
          <Button 
            onClick={handleQuizStart} 
            className="bg-white text-quiz-primary hover:bg-quiz-light flex items-center gap-2"
          >
            <Play size={18} />
            Start Quiz
          </Button>
        ) : (
          <Timer 
            initialTime={question.timeLimit} 
            onTimeUp={handleTimeUp} 
            isActive={isTimerActive} 
          />
        )}
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
              disabled={!quizStarted}
            />
          ))}
        </div>
        
        {renderSubmitButton()}

        {!quizStarted && (
          <div className="mt-6 p-4 bg-quiz-light rounded-lg text-center">
            <p className="text-quiz-primary font-bold flex items-center justify-center gap-2">
              <Clock size={18} />
              Click "Start Quiz" to begin!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
