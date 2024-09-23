import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupBy = (data: any[], key: string) => {
  if (key === "none") return { None: data }; // If no grouping is selected, return the whole list as one group.

  return data.reduce((result, item) => {
    const groupKey = item[key] || "Unknown"; // Fallback if key is missing
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, any[]>); // Create an object with group keys as property names
};
