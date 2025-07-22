import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { DEFAULT_IMAGE_URL } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(image: string | null | undefined) {
  return image?.trim() || DEFAULT_IMAGE_URL;
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

export function getFormattedDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getTruncatedText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
