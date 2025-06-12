interface LoginProps {
  email: string;
  password: string;
}

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

// export type Response<T> = SuccessResponse<T> | ErrorResponse<T>;
