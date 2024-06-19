import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// clsx - utitlity for constructing `className` strings conditionally
// ClassValue - type for values that `clsx` can handle (strings, objects, arrays, etc.)
// cn - takes any number of arguments (`...inputs`) of type `ClassValue[]`
// twMerge - handle any TailwindCSS class conflicts and ensure a clean, merged class string