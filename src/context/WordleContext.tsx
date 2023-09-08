import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { getRandomWord } from "@/utilities";
import { GAME } from "@/constants";

interface WordleContextType {
  won: number;
  timer: number;
  played: number;
  guesses: string[];
  targetWord: string;
  maxGuesses: number;
  currentGuess: string;
  showWinModal: boolean;
  showLostModal: boolean;
  showInstructions: boolean;

  setTargetWord: React.Dispatch<React.SetStateAction<string>>;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  closeModalInstructions: () => void;
  closeWinModal: () => void;
  makeGuess: () => void;
  resetGame: () => void;
  closeLostModal: () => void;
}

export const WordleContext = createContext<WordleContextType | undefined>(
  undefined
);

const FIVE_MINUTES = 5 * 60 * 1000;

export const WordleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initialRender = useRef(true);
  const [won, setWon] = useState<number>(0);
  const [timer, setTimer] = useState<number>(300);
  const [played, setPlayed] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  const [showLostModal, setShowLostModal] = useState<boolean>(false);
  const [maxGuesses, setMaxGuesses] = useState<number>(GAME.MAX_GUESSES);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [loadingShowInstructions, setLoadingShowInstructions] =
    useState<boolean>(true);

  const checkWin = () => {
    if (targetWord.toLowerCase() === currentGuess.toLowerCase()) return true;
    return false;
  };

  const makeGuess = () => {
    setGuesses((prev) => [...prev, currentGuess]);
    const hasWon = checkWin();
    if (hasWon) {
      setShowWinModal(true);
      setWon((prev) => prev + 1);
      return;
    }
    setMaxGuesses((prev) => prev - 1);
    if (maxGuesses === 1) {
      setShowLostModal(true);
      return;
    }

    setCurrentGuess("");
  };

  const getRandomUnusedWord = useCallback(async (): Promise<string> => {
    const word = await getRandomWord();
    const isUsed = usedWords.includes(word);
    if (isUsed) {
      return getRandomUnusedWord();
    }
    return word;
  }, [usedWords]);

  const closeModalInstructions = () => {
    setShowInstructions(false);
    localStorage.setItem("hasShownInstructions", "true");
  };

  const closeWinModal = () => {
    setShowWinModal(false);
    resetGame();
  };

  const closeLostModal = () => {
    setShowLostModal(false);
    resetGame();
  };

  const resetGame = useCallback(async () => {
    const word = await getRandomUnusedWord();
    setTimer(300);
    setGuesses([]);
    setCurrentGuess("");
    setTargetWord(word);
    setShowInstructions(false);
    setPlayed((prev) => prev + 1);
    setMaxGuesses(GAME.MAX_GUESSES);
    setUsedWords((prev) => [...prev, word]);
  }, [getRandomUnusedWord]);

  useEffect(() => {
    const hasShownInstructions = localStorage.getItem("hasShownInstructions");
    setLoadingShowInstructions(false);
    if (!hasShownInstructions) {
      setShowInstructions(true);
    }
    setShowInstructions(false);
  }, []);

  useEffect(() => {
    if (showInstructions || showWinModal || showLostModal) return;
    if (initialRender.current) {
      resetGame();
    }

    initialRender.current = false;
    const timer = setInterval(() => {
      resetGame();
    }, FIVE_MINUTES);
    const timeLeft = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(timeLeft);
    };
  }, [showInstructions, resetGame, showWinModal, showLostModal]);

  useEffect(() => {
    const hasShownInstructions = localStorage.getItem("hasShownInstructions");
    if (!hasShownInstructions) {
      setShowInstructions(true);
    }
  }, []);

  return (
    <WordleContext.Provider
      value={{
        won,
        timer,
        played,
        guesses,
        targetWord,
        maxGuesses,
        currentGuess,
        showWinModal,
        showLostModal,
        showInstructions: showInstructions && !loadingShowInstructions,
        resetGame,
        makeGuess,
        setTargetWord,
        closeWinModal,
        closeLostModal,
        setCurrentGuess,
        closeModalInstructions,
        setShowInstructions,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
