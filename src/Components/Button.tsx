import { FC } from "react";

type btnType = {
  text: string;
  className: string;
};

export const Buttons: FC<btnType> = ({ text, className }) => {
  return (
    <div>
      <button className={className}>{text}</button>
    </div>
  );
};
