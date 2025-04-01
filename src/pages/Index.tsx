
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleQuizData } from "@/data/quizData";
import QuizHeader from "@/components/QuizHeader";
import QuestionCard from "@/components/QuestionCard";
import { Trophy, Star, BookOpen } from "lucide-react";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = selectedQuiz 
    ? sampleQuizData.questions[currentQuestionIndex]
    : null;

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setQuizStarted(false);
  };
  
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
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setQuizStarted(false);
  };

  // Quiz selection screen
  if (!selectedQuiz) {
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
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-quiz-primary to-purple-500 text-transparent bg-clip-text mb-4">
              Quizzy for Grade 5
            </h1>
            <p className="text-quiz-dark text-xl">Choose a quiz to get started!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quiz 1 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden bg-gradient-to-br from-white to-quiz-light">
              <CardHeader className="bg-quiz-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={24} />
                  Math Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">Test your math skills with fun questions!</p>
                <div className="flex items-center gap-2 text-sm font-medium text-quiz-dark">
                  <span className="px-3 py-1 bg-quiz-light rounded-full">10 Questions</span>
                  <span className="px-3 py-1 bg-quiz-light rounded-full">Easy</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleQuizSelect("math")}
                  className="w-full bg-gradient-to-r from-quiz-primary to-purple-500 text-white hover:opacity-90"
                >
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quiz 2 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden bg-gradient-to-br from-white to-blue-100">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={24} />
                  Science Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">Explore the world of science with exciting questions!</p>
                <div className="flex items-center gap-2 text-sm font-medium text-quiz-dark">
                  <span className="px-3 py-1 bg-blue-100 rounded-full">8 Questions</span>
                  <span className="px-3 py-1 bg-blue-100 rounded-full">Medium</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleQuizSelect("science")}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:opacity-90"
                >
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                onAnswerSelected={handleAnswerSelected}
                onTimeUp={handleTimeUp}
                isLastQuestion={currentQuestionIndex === sampleQuizData.questions.length - 1}
                quizStarted={quizStarted}
                onQuizStart={() => setQuizStarted(true)}
              />
            )}
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
              
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-gradient-to-r from-quiz-primary to-purple-500 text-white rounded-xl font-bold text-lg hover:from-purple-500 hover:to-quiz-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
