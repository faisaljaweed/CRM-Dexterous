import { FC } from "react";

type btnType = {
  text: string;
  className: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export const Buttons: FC<btnType> = ({ text, className, onClick, type }) => {
  return (
    <div>
      <button onClick={onClick} className={className} type={type}>
        {text}
      </button>
    </div>
  );
};
