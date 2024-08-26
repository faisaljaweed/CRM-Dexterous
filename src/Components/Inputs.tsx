import { FC } from "react";

type inputsTypes = {
  type: string;
  value: string;
  id: string;
  placeholder: string;
  onChange: any;
};

export const Inputs: FC<inputsTypes> = ({
  type,
  value,
  id,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};
