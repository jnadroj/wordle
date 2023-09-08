import { Key } from "@/components";
import { useWordle } from "@/hooks";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
const rowKeys = "flex gap-x-[9.57px] gap-y-[8.95px]";
const Keyboard: React.FC = () => {
  const { targetWord, guesses, currentGuess, setCurrentGuess, makeGuess } =
    useWordle();

  const getLetterColorClass = (letter: string) => {
    const currentIndex = targetWord.toLowerCase().indexOf(letter.toLowerCase());

    let state: "default" | "incorrect" | "warning" | "success" = "default";

    for (let i = guesses.length - 1; i >= 0; i--) {
      const guess = guesses[i];
      const guessIndex = guess.toLowerCase().indexOf(letter.toLowerCase());

      if (currentIndex === -1) {
        if (guessIndex !== -1 && currentIndex === -1) {
          state = "incorrect";
        }
      } else if (currentIndex === guessIndex) {
        state = "success";
        break;
      } else if (guessIndex !== -1 && currentIndex !== -1) {
        state = "warning";
        break;
      }
    }
    return state;
  };

  const handleClick = (key: string) => {
    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length === targetWord.length) return;
      setCurrentGuess((prevWord) => prevWord + key.toUpperCase());
    } else if (key === "Backspace") {
      setCurrentGuess((prevWord) => prevWord.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length !== targetWord.length) return;
      makeGuess();
    }
  };
  return (
    <div className="h-[238px] w-full bg-keyboard rounded-hard flex flex-col gap-y-[8.95px] py-[33px] px-[20px]">
      <div className={rowKeys}>
        <div className="min-w-[20.67px] min-h-[51.05px]" />
        {Array.from(Array(10)).map((_, i) => (
          <Key
            color={getLetterColorClass(keys[i])}
            key={i}
            onClick={() => handleClick(keys[i])}
          >
            {keys[i]}
          </Key>
        ))}
      </div>
      <div className={rowKeys}>
        <div className="min-w-[44.67px] min-h-[51.05px]" />
        {Array.from(Array(10)).map((_, i) => (
          <Key
            color={getLetterColorClass(keys[i + 10])}
            key={i + 10}
            onClick={() => handleClick(keys[i + 10])}
          >
            {keys[i + 10]}
          </Key>
        ))}
      </div>
      <div className={rowKeys}>
        <Key
          color={getLetterColorClass("#")}
          onClick={() => handleClick("Enter")}
        >
          ENTER
        </Key>
        {Array.from(Array(7)).map((_, i) => (
          <Key
            color={getLetterColorClass(keys[i + 20])}
            key={i + 20}
            onClick={() => handleClick(keys[i + 20])}
          >
            {keys[i + 20]}
          </Key>
        ))}
        <Key
          color={getLetterColorClass("#")}
          onClick={() => handleClick("Backspace")}
        >
          {deleteIcon}
        </Key>
      </div>
    </div>
  );
};

const deleteIcon = (
  <svg
    width="23"
    height="17"
    viewBox="0 0 23 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.94968 4.31639L13.587 7.78048L17.2243 4.31639L18.3244 5.47152L14.7435 8.88191L18.3244 12.2923L17.2243 13.4474L13.587 9.98334L9.94968 13.4474L8.84955 12.2923L12.4305 8.88191L8.84955 5.47152L9.94968 4.31639Z"
      className="fill-secondary"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.68607 0.906006C6.39072 0.906006 6.1119 1.04237 5.93057 1.27551L0.47151 8.2943C0.202693 8.63992 0.202694 9.1239 0.47151 9.46952L5.93057 16.4883C6.1119 16.7214 6.39071 16.8578 6.68607 16.8578H21.6027C22.1313 16.8578 22.5599 16.4293 22.5599 15.9007V1.86311C22.5599 1.33451 22.1313 0.906006 21.6027 0.906006H6.68607ZM2.03536 8.88191L6.99814 2.50119H20.9647V15.2626H6.99814L2.03536 8.88191Z"
      className="fill-secondary"
    />
  </svg>
);

export default Keyboard;
