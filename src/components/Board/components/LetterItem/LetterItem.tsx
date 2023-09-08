import clsx from "clsx";
import "./Letter.css";

type Color = "default" | "incorrect" | "warning" | "success";
export interface LetterItemProps {
  letter?: string;
  color: Color;
  animated?: boolean;
}

const LetterItem: React.FC<LetterItemProps> = ({ letter, color, animated }) => {
  return (
    <div
      className={clsx(
        "w-[76px] h-[76px] rounded-soft flex justify-center items-center ",
        {
          "bg-item-default text-inverse": color === "default",
          "bg-item-incorrect text-default": color === "incorrect",
          "bg-item-warning text-default": color === "warning",
          "bg-item-correct text-default": color === "success",
          "animate-wordle": animated,
        }
      )}
    >
      {letter && <span className="text-4xl">{letter}</span>}
    </div>
  );
};

export default LetterItem;
