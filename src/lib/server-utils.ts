export interface SuccessResponse<T> {
  success: true;
  timestamp: number;
  message: string;
  data: T;
}

export interface ErrorResponse<T> {
  success: false;
  timestamp: number;
  message: string;
  error: T;
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
  message = "fail",
  error: T = {} as T
): ErrorResponse<T> {
  return {
    success: false,
    timestamp: new Date().getTime(),
    message: message,
    error: error,
  };
}
