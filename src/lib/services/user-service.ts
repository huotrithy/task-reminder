"use server";

import { getServerAuthSession } from "../auth";
import { userRepository } from "../db/user-repository";
import {
  upsertTelegramChatIDInputs,
  upsertTelegramChatIDSchema,
} from "../schemas/user-schema";
import { errorResponse, successResponse } from "../utils";

export async function getUser() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }

    const userId = session.user.id;
    const user = await userRepository.getUserByID(userId);
    if (!user) {
      return errorResponse({}, "User not found.");
    }

    return successResponse({ user: user });
  } catch {
    return errorResponse({}, "Something went wrong.");
  }
}

export async function upSertTelegramChatID(
  formInput: upsertTelegramChatIDInputs
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }

    const validation = upsertTelegramChatIDSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const userId = session.user.id;
    const updatedUser = await userRepository.upsertTelegramChatID(
      validation.data,
      userId
    );

    return successResponse({ user: updatedUser });
  } catch (error: unknown) {
    console.log(error);
    return errorResponse({}, "Something went wrong.");
  }
}
