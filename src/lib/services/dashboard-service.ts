"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { logger } from "../logger";

import { ERROR_MESSAGE } from "../../shared/user-message";
import { errorResponse, successResponse } from "../server-utils";
import {
  dbGetNumTaskByCategory,
  dbGetTaskDeadlineProximity,
} from "../db/dashboard-repository";
import { DEADLINE_PROXIMITY_OBJECT } from "@/shared/const";

export async function getTaskByCategory() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const userId = session.user.id;
    const result = await dbGetNumTaskByCategory(userId);

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

export async function getTaskDeadlineProximity() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const userId = session.user.id;
    const result = await dbGetTaskDeadlineProximity(userId);

    // { month: "June", desktop: 214, mobile: 140 }

    const categories = new Set<string>();
    Object.values(result).forEach((taskList) => {
      taskList.forEach((task) => {
        if (task.Category && task.Category.categoryName) {
          categories.add(task.Category.categoryName);
        }
      });
    });

    const categoryNames = Array.from(categories);

    const keys = Object.keys(result) as (keyof typeof result)[];
    const serializedResult = keys.map((key) => {
      const deadlineTasks = result[key];
      const categoryCounts: Record<string, number> = {};

      categoryNames.forEach((cat) => {
        categoryCounts[cat] = 0;
      });

      deadlineTasks.forEach((task) => {
        const category = task.Category?.categoryName;
        if (category && category in categoryCounts) {
          categoryCounts[category]++;
        }
      });

      // Combine the deadline label and category counts into the final object
      return {
        type: DEADLINE_PROXIMITY_OBJECT[key],
        ...categoryCounts,
      };
    });

    return successResponse({ serializedResult, rawResult: result });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}
