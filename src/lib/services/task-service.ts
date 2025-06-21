"use server";

import { getServerAuthSession } from "../auth";
import { taskRepository } from "../db/task-repository";
import { CreateTaskInputs, createTaskSchema } from "../schemas/task-schemas";
import { errorResponse, successResponse } from "../utils";

export async function createTask(formInput: CreateTaskInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }

    const validation = createTaskSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const createdTask = taskRepository.createTask(validation.data);
    return successResponse({ task: createdTask });
  } catch (error: unknown) {
    console.log(error);
    return errorResponse({}, "Could not retrieve tasks.");
  }
}

export async function getTasks() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const tasks = await taskRepository.getTasks(userId);
    return successResponse({ tasks: tasks });
  } catch {
    return errorResponse({}, "Could not retrieve tasks.");
  }
}
