import { ReactNode } from "react";

interface TForm {
  handleOnSubmit: () => void;
  children: ReactNode;
}

export const Form = ({ handleOnSubmit, children }: TForm) => {
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col items-center justify-center gap-4 w-96 p-12 bg-white rounded-xl shadow-xl"
    >
      {children}
    </form>
  );
};
