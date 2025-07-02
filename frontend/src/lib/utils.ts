import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(data: unknown): string {
  if (Array.isArray(data) && typeof data[0] === "string") {
    return data[0];
  }

  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object" && data !== null && "detail" in data) {
    return data.detail as string;
  }

  return "An unknown error occurred.";
}
