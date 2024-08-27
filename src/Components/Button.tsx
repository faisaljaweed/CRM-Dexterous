import { FC } from "react";

type btnType = {
  text: string;
  className: string;
  onClick?: () => void;
};

export const Buttons: FC<btnType> = ({ text, className, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {text}
      </button>
    </div>
  );
};
