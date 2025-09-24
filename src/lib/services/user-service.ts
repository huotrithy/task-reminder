"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { userRepository } from "../db/user-repository";
import {
  upsertTelegramChatIDInputs,
  upsertTelegramChatIDSchema,
} from "../schemas/user-schema";
import { errorResponse, successResponse } from "../serverUtils";
import { logger } from "../logger";
import { ERROR_MESSAGE } from "../../shared/user-message";

export async function getUser() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const userId = session.user.id;
    const user = await userRepository.getUserByID(userId);
    if (!user) {
      logger.error(ERROR_MESSAGE.USER_NOT_FOUND);
      return errorResponse(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return successResponse({ user: user });
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function upSertTelegramChatID(
  formInput: upsertTelegramChatIDInputs
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const validation = upsertTelegramChatIDSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const userId = session.user.id;
    const updatedUser = await userRepository.upsertTelegramChatID(
      validation.data,
      userId
    );

    return successResponse({ user: updatedUser });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}
