"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { taskRepository } from "../db/task-repository";
import {
  DeleteTaskInput,
  deleteTaskSchema,
  TaskIncludeOptions,
  UpsertTaskInputs,
  upsertTaskSchema,
} from "../schemas/task-schemas";
import { errorResponse, successResponse } from "../serverUtils";
import { logger } from "../logger";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../shared/user-message";

export async function getTasks() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const tasks = await taskRepository.getTasks(userId);

    return successResponse({ tasks: tasks });
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function getTask(
  id: string,
  taskIncludeOptions?: TaskIncludeOptions
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const task = await taskRepository.getTask(id, userId, taskIncludeOptions);
    if (!task) {
      logger.error(ERROR_MESSAGE.TASK_NOT_FOUND);
      return errorResponse(ERROR_MESSAGE.TASK_NOT_FOUND);
    }
    return successResponse({ task: task });
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function createTask(formInput: UpsertTaskInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const validation = upsertTaskSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const createdTask = taskRepository.createTask(validation.data);
    return successResponse({ task: createdTask });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function updateTask(formInput: UpsertTaskInputs, taskId: string) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const validation = upsertTaskSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const updatedTask = await taskRepository.updateTask(
      validation.data,
      taskId,
      userId
    );

    if (!updatedTask) {
      logger.error(ERROR_MESSAGE.TASK_NOT_FOUND);
      return errorResponse(ERROR_MESSAGE.TASK_NOT_FOUND);
    }

    return successResponse({ task: updatedTask });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function deleteTask(formInput: DeleteTaskInput) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const validation = deleteTaskSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const deletedTask = await taskRepository.deleteTask(
      validation.data,
      userId
    );

    if (!deletedTask) {
      logger.error(ERROR_MESSAGE.TASK_NOT_FOUND);
      return errorResponse(ERROR_MESSAGE.TASK_NOT_FOUND);
    }

    return successResponse({ task: deletedTask }, SUCCESS_MESSAGE.DELETE_TASK);
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}
