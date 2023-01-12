import { TForm } from "../constants/interfaces";

export const Form = ({ handleOnSubmit, styles, children }: TForm) => {
  return (
    <form
      onSubmit={handleOnSubmit}
      className={`flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-xl ${
        styles ?? "w-96 p-12"
      }`}
    >
      {children}
    </form>
  );
};
