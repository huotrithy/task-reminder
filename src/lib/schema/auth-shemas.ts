import { z } from "zod/v4";

export const signupSchema = z
  .object({
    email: z.email({ message: "Invalid email address." }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormInputs = z.infer<typeof signupSchema>;
