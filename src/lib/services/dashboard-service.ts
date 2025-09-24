"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { logger } from "../logger";

import { ERROR_MESSAGE } from "../../shared/user-message";
import { errorResponse, successResponse } from "../server-utils";
import { getNumTaskByCategory } from "../db/dashboard-repository";

export async function getTaskByCategory() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const userId = session.user.id;
    const result = await getNumTaskByCategory(userId);

    const serializedResult = result.map((d) => {
      return {
        categoryName: d.categoryName,
        tasksCount: d._count.task,
      };
    });

    return successResponse({ serializedResult });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}
