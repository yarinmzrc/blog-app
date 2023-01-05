import { TLabel } from "../constants/interfaces";

export const Label = ({ htmlFor, children }: TLabel) => {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold text-gray-500 ">
      {children}
    </label>
  );
};
