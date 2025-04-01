
import React, { useState, useEffect } from "react";
import QuizHeader from "@/components/QuizHeader";
import QuestionCard from "@/components/QuestionCard";
import { sampleQuizData } from "@/data/quizData";
import { Trophy, Star } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

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
    // Directly show final score when time is up
    setQuizComplete(true);
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-300 to-green-300 opacity-50 animate-bounce-slow"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-50 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-green-300 to-blue-300 opacity-50 animate-bounce-slow"></div>
        
        {/* Extra floating elements */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full" 
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
              opacity: 0.6,
              animation: `bounce-slow ${Math.random() * 5 + 3}s infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
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
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center relative overflow-hidden">
            {/* Background decorations for result page */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-50"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-purple-300 to-purple-500 rounded-full opacity-50"></div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-quiz-light rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Trophy size={50} className="text-quiz-primary" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center animate-bounce-slow">
                  <Star size={20} className="text-yellow-600" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-quiz-dark mb-4">
                Great Job!
              </h2>
              
              <div className="text-2xl mb-6 px-4 py-2 bg-gradient-to-r from-quiz-light to-purple-100 rounded-full inline-block">
                Your score: <span className="font-bold text-quiz-primary">{score}</span>
              </div>
              
              <div className="mb-8">
                <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden relative">
                  <div
                    className="h-8 bg-gradient-to-r from-quiz-primary to-purple-400 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(score / (sampleQuizData.questions.length * 100)) * 100}%`,
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md">
                    {Math.round((score / (sampleQuizData.questions.length * 100)) * 100)}% correct
                  </div>
                </div>
              </div>
              
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-gradient-to-r from-quiz-primary to-purple-500 text-white rounded-xl font-bold text-lg hover:from-purple-500 hover:to-quiz-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Play Again!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
