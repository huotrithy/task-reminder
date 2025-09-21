interface LoginProps {
  email: string;
  password: string;
}

export type TruthyKeys<T> = keyof {
  [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
};

export type ServerResponse = {
  success: boolean;
  timestamp: number;
  message: string;
  data: object;
};
