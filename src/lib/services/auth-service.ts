"use server";

import bcrypt from "bcryptjs";
import { userRepository } from "../db/user-repository";
import { SALTROUNDS } from "../constants";
import {
  LoginInputs,
  loginSchema,
  SignupFormInputs,
  signupSchema,
} from "../schemas/auth-schemas";
import { errorResponse, successResponse } from "../serverUtils";
import { logger } from "../logger";
import { ERROR_MESSAGE } from "../../shared/user-message";

export async function login({ email, password }: LoginInputs) {
  try {
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const validatedEmail = validation.data.email;
    const validatedPassword = validation.data.password;

    const dbUser = await userRepository.getUser(validatedEmail);
    if (!dbUser) {
      logger.error(ERROR_MESSAGE.USER_NOT_EXIST);
      return errorResponse(ERROR_MESSAGE.USER_NOT_EXIST);
    }

    const isPasswordCorrect = await bcrypt.compare(
      validatedPassword,
      dbUser.password
    );

    if (isPasswordCorrect === false) {
      logger.error(ERROR_MESSAGE.INCORRECT_PASSWORD);
      return errorResponse(ERROR_MESSAGE.INCORRECT_PASSWORD);
    }

    return successResponse({ user: dbUser });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function signup(formInput: SignupFormInputs) {
  try {
    const validation = signupSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const { email, password } = validation.data;

    const dbUser = await userRepository.getUser(email);
    if (dbUser) {
      logger.error(ERROR_MESSAGE.EMAIL_ALREADY_EXIST);
      return errorResponse(ERROR_MESSAGE.EMAIL_ALREADY_EXIST);
    }

    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    const createdUser = await userRepository.createUser(email, hashedPassword);
    return successResponse({ user: createdUser });
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}
