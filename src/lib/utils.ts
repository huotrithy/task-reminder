import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";
import { ErrorResponse, SuccessResponse } from "./types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function successResponse<T>(
  data: T = {} as T,
  message: string = "success"
): SuccessResponse<T> {
  return {
    success: true,
    timestamp: new Date().getTime(),
    message: message,
    data: data,
  };
}

export function errorResponse<T>(
  error: T = {} as T,
  message = "fail"
): ErrorResponse<T> {
  return {
    success: false,
    timestamp: new Date().getTime(),
    message: message,
    error: error,
  };
}
