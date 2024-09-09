import { FC } from "react";

type inputsTypes = {
  type: string;
  value?: string;
  id?: string;
  placeholder?: string;
  onChange?: any;
  className?: string;
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
        className="w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 border-black border-2 "
        required
      />
    </>
  );
};
