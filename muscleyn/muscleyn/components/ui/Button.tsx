import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-8 py-4 rounded-full font-semibold transition duration-300",
        {
          "bg-red-500 hover:bg-red-600 text-white":
            variant === "primary",

          "border border-white text-white hover:bg-white hover:text-black":
            variant === "secondary",
        }
      )}
    >
      {children}
    </button>
  );
}