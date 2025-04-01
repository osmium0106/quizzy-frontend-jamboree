
import React, { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, onTimeUp]);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  // Calculate the percentage of time left for the progress bar
  const progressPercentage = (timeLeft / initialTime) * 100;
  
  // Determine color based on time left
  const getTimerColor = () => {
    if (progressPercentage > 60) return "bg-quiz-primary";
    if (progressPercentage > 30) return "bg-yellow-500";
    return "bg-quiz-incorrect";
  };

  return (
    <div className="flex items-center gap-2">
      <Clock size={20} className="text-quiz-primary" />
      <div className="relative w-20 h-5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${getTimerColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {timeLeft}s
        </div>
      </div>
    </div>
  );
};

export default Timer;
