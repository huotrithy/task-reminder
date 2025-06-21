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

export type TruthyKeys<T> = keyof {
  [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
};
