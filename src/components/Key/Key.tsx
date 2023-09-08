import clsx from "clsx";
import { PropsWithChildren } from "react";

type Color = "default" | "incorrect" | "warning" | "success";

interface KeyProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  color: Color;
}
const Key: React.FC<PropsWithChildren<KeyProps>> = ({
  children,
  className,
  color,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "flex justify-center text-secondary items-center py-3 px-4  min-w-[44.67px] min-h-[51.05px] rounded-soft",
        className,
        {
          "bg-item-default text-inverse": color === "default",
          "bg-item-incorrect text-default": color === "incorrect",
          "bg-item-warning text-default": color === "warning",
          "bg-item-correct text-default": color === "success",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Key;
