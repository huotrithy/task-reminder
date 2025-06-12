"use server";

import bcrypt from "bcryptjs";
import { userRepository } from "../db/user-repository";
import { SALTROUNDS } from "../constants";
import { errorResponse, successResponse } from "../utils";
import { signupSchema } from "../schema/auth-shemas";

export async function login(email: string, password: string) {
  const user = await userRepository.getUser(email);
  if (user && user.password === password) {
    return user;
  }
  return user;
}

export async function signup(formData: FormData) {
  const formInput = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  };

  const validation = signupSchema.safeParse(formInput);
  if (!validation.success) {
    const fieldErrors = validation.error.message;
    return errorResponse({}, fieldErrors);
  }

  const { email, password } = validation.data;

  const dbUser = await userRepository.getUser(email);
  if (dbUser) {
    return errorResponse({}, "This email is already exist.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    const createdUser = await userRepository.createUser(email, hashedPassword);
    return successResponse({ user: createdUser });
  } catch {
    return errorResponse(
      {},
      `Signup failed: s"An unexpected error occurred."}`
    );
  }
}
