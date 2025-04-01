
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
  image?: string;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
  totalTime: number; // in seconds
}

export const sampleQuizData: QuizData = {
  id: "quiz-123",
  title: "General Knowledge Quiz",
  totalTime: 300,
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2, // Paris
      timeLimit: 20
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1, // Mars
      timeLimit: 20
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3, // Pacific Ocean
      timeLimit: 20
    },
    {
      id: 4,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2, // Leonardo da Vinci
      timeLimit: 20
    },
    {
      id: 5,
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Gd"],
      correctAnswer: 0, // Au
      timeLimit: 20
    }
  ]
};
