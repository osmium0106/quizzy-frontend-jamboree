
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Toggle } from "./ui/toggle";

// Audio files
const AUDIO_FILES = {
  backgroundMusic: "/sounds/background-music.mp3",
  click: "/sounds/click.mp3",
  correct: "/sounds/correct.mp3",
  wrong: "/sounds/wrong.mp3",
  countdown: "/sounds/countdown.mp3",
  timeUp: "/sounds/time-up.mp3",
};

interface AudioControllerProps {
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export const playSound = (sound: keyof typeof AUDIO_FILES) => {
  const audioElement = new Audio(AUDIO_FILES[sound]);
  audioElement.volume = sound === "backgroundMusic" ? 0.3 : 0.5;
  
  if (localStorage.getItem("audioEnabled") === "true") {
    if (sound === "backgroundMusic") {
      audioElement.loop = true;
    }
    audioElement.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    return audioElement;
  }
  return null;
};

export const AudioController: React.FC<AudioControllerProps> = ({ 
  audioEnabled, 
  toggleAudio 
}) => {
  const { toast } = useToast();

  const handleToggle = () => {
    toggleAudio();
    toast({
      title: audioEnabled ? "Sound Off" : "Sound On",
      description: audioEnabled ? "Audio has been disabled" : "Audio has been enabled",
      duration: 1500,
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Toggle 
        pressed={audioEnabled} 
        onPressedChange={handleToggle}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg rounded-full p-2"
      >
        {audioEnabled ? (
          <Volume2 className="w-5 h-5 text-quiz-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-quiz-primary" />
        )}
      </Toggle>
    </div>
  );
};

export const useAudio = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Get audio preference from localStorage
    const savedPreference = localStorage.getItem("audioEnabled");
    const initialState = savedPreference === "true";
    setAudioEnabled(initialState);

    // Start background music if enabled
    if (initialState) {
      backgroundMusicRef.current = playSound("backgroundMusic");
    }

    // Cleanup function
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    localStorage.setItem("audioEnabled", String(newState));

    if (newState) {
      // Start background music
      backgroundMusicRef.current = playSound("backgroundMusic");
    } else {
      // Stop background music
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    }
  };

  return { audioEnabled, toggleAudio };
};

export default AudioController;
