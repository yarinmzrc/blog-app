import { FormEvent } from "react";

interface TInput {
  placeholder: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const Input = ({ placeholder, type, id, value, onChange }: TInput) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      id={id}
      className="bg-white border text-gray-500 tracking-wide text-sm rounded-xl p-3 !outline-none"
      placeholder={placeholder}
      required
    />
  );
};
