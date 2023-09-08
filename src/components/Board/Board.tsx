import { useEffect, useMemo, useState } from "react";

import { useWordle } from "@/hooks";

import { LetterItem } from "./components";

const Board: React.FC = () => {
  const {
    targetWord,
    showInstructions,
    guesses,
    setCurrentGuess,
    makeGuess,
    currentGuess,
  } = useWordle();
  const [animatedRow, setAnimatedRow] = useState<number | null>(null);

  const rows = useMemo(() => Array.from(Array(5).fill(1)), []);
  const columns = useMemo(
    () => Array.from(Array(targetWord.length).fill(1)),
    [targetWord]
  );

  useEffect(() => {
    if (!showInstructions) {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (/^[a-zA-Z]$/.test(event.key)) {
          if (currentGuess.length === targetWord.length) return;
          setCurrentGuess((prevWord) => prevWord + event.key.toUpperCase());
        } else if (event.key === "Backspace") {
          setCurrentGuess((prevWord) => prevWord.slice(0, -1));
        } else if (event.key === "Enter") {
          if (currentGuess.length !== targetWord.length) return;
          makeGuess();
          setAnimatedRow(guesses.length);

          setTimeout(() => {
            setAnimatedRow(null);
          }, 500);
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [showInstructions, currentGuess, targetWord]);

  const getLetter = (idRow: number, idColumn: number) => {
    if (idRow < guesses.length) {
      if (idColumn < guesses[idRow].length) {
        return guesses[idRow][idColumn];
      }
    } else if (idRow === guesses.length && idColumn < currentGuess.length) {
      return currentGuess[idColumn];
    }
    return "";
  };

  const getLetterColorClass = (idRow: number, idColumn: number) => {
    if (idRow < guesses.length) {
      if (idColumn < guesses[idRow].length) {
        const guessLetter = guesses[idRow][idColumn];
        const targetLetter = targetWord[idColumn];
        if (guessLetter.toLowerCase() === targetLetter) {
          return "success";
        } else if (targetWord.includes(guessLetter.toLowerCase())) {
          return "warning";
        } else {
          return "incorrect";
        }
      }
    }

    return "default";
  };

  return (
    <div className="flex flex-wrap justify-center gap-[11px] mt-[87px] mb-[54px]">
      {rows.map((_, idRow) => (
        <div key={idRow} className="flex gap-[11px]">
          {columns.map((_, idColumn) => (
            <LetterItem
              key={idColumn}
              animated={animatedRow === idRow}
              letter={getLetter(idRow, idColumn)}
              color={getLetterColorClass(idRow, idColumn)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
