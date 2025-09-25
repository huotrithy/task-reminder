import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 
function generateColors(count: number) {
  // Generate color for chart

  return Array.from({ length: count }, (_, i) => {
    // 0–360 degrees around the wheel
    const hue = (i * 360) / count;
    return `hsl(${hue}, 65%, 50%)`;
  });
}
*/

export function generateColorFromString(str: string) {
  // hash of string to number
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Pick hue from hash
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}
