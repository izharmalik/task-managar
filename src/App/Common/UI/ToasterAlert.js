import { Toaster } from "react-hot-toast";

export const ToastAlert = () => {
  return (
    <Toaster
      toastOptions={{
        className: "text-sm",
      }}
    />
  );
};
