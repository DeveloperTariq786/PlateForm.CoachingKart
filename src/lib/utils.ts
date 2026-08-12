import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeImageUrl(url?: string): string | undefined {
  if (!url) return undefined;

  const trimmed = url.trim();
  if (!trimmed) return undefined;

  if (/^(https?:|data:|blob:|\/\/)/i.test(trimmed)) {
    return trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
  }

  if (/^\/?assets\.[^/]+/i.test(trimmed)) {
    return `https://${trimmed.replace(/^\/+/, "")}`;
  }

  return trimmed;
}
