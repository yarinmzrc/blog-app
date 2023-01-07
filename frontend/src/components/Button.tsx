import { TButton } from "../constants/interfaces";

export const Button = ({ children }: TButton) => {
  return (
    <button
      type="submit"
      className="inline-block px-8 py-3 mt-3 border-2 border-grey-800 text-grey-800 font-medium text-xs leading-tight uppercase rounded-xl hover:bg-emerald-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};
