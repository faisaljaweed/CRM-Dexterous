import { FC } from "react";

type inputsTypes = {
  type: string;
  value?: string;
  id: string;
  placeholder: string;
  onChange?: any;
  className?: string;
};

export const Inputs: FC<inputsTypes> = ({
  type,
  value,
  id,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        required
      />
    </>
  );
};
