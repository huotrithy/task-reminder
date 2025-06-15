"use server";

import bcrypt from "bcryptjs";
import { userRepository } from "../db/user-repository";
import { SALTROUNDS } from "../constants";
import { errorResponse, successResponse } from "../utils";
import { LoginInputs, loginSchema, signupSchema } from "../schema/auth-shemas";

export async function login({ email, password }: LoginInputs) {
  try {
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const validatedEmail = validation.data.email;
    const validatedPassword = validation.data.password;

    const dbUser = await userRepository.getUser(validatedEmail);
    if (!dbUser) {
      return errorResponse({}, "This account does not exist.");
    }

    const isPasswordCorrect = await bcrypt.compare(
      validatedPassword,
      dbUser.password
    );

    if (isPasswordCorrect === false) {
      return errorResponse({}, "Incorrect password.");
    }

    return successResponse({ user: dbUser });
  } catch (error: unknown) {
    console.log(error);
    return errorResponse({}, "Login failed: An unexpected error occurred.");
  }
}

export async function signup(formData: FormData) {
  try {
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

    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    const createdUser = await userRepository.createUser(email, hashedPassword);
    return successResponse({ user: createdUser });
  } catch {
    return errorResponse({}, "Signup failed: An unexpected error occurred.");
  }
}
