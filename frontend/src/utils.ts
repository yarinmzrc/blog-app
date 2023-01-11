import { toast } from "react-toastify";

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US");
};

export const toastMessage = (message: string, isError: boolean) => {
  if (isError) {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
  }
};
