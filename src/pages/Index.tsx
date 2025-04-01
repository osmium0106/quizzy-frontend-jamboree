
import React, { useState } from "react";
import QuizHeader from "@/components/QuizHeader";
import QuestionCard from "@/components/QuestionCard";
import { sampleQuizData } from "@/data/quizData";
import { Trophy } from "lucide-react";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = sampleQuizData.questions[currentQuestionIndex];
  
  const handleAnswerSelected = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 100);
    }
    
    // Move to next question or end quiz
    if (currentQuestionIndex < sampleQuizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };
  
  const handleTimeUp = () => {
    // Move to next question without adding score
    if (currentQuestionIndex < sampleQuizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {!quizComplete ? (
          <>
            <QuizHeader
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={sampleQuizData.questions.length}
              score={score}
            />
            
            <QuestionCard
              question={currentQuestion}
              onAnswerSelected={handleAnswerSelected}
              onTimeUp={handleTimeUp}
            />
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-quiz-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy size={40} className="text-quiz-primary" />
            </div>
            <h2 className="text-3xl font-bold text-quiz-dark mb-4">
              Quiz Complete!
            </h2>
            <p className="text-xl mb-6">
              Your final score: <span className="font-bold text-quiz-primary">{score}</span>
            </p>
            <div className="mb-8">
              <div className="h-4 w-full bg-gray-200 rounded-full">
                <div
                  className="h-4 bg-quiz-primary rounded-full"
                  style={{
                    width: `${(score / (sampleQuizData.questions.length * 100)) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-gray-600 text-sm">
                {Math.round((score / (sampleQuizData.questions.length * 100)) * 100)}% correct
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-quiz-primary text-white rounded-xl font-bold hover:bg-quiz-secondary transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
