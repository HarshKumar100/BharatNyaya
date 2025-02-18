import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine class names using clsx and tailwind-merge
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Read file as Data URL promise
export const readFileAsDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
