"use server";

import { getServerAuthSession } from "../auth";
import { taskRepository } from "../db/task-repository";
import {
  DeleteTaskInput,
  deleteTaskSchema,
  UpsertTaskInputs,
  upsertTaskSchema,
} from "../schemas/task-schemas";
import { errorResponse, successResponse } from "../utils";

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

export async function getTask(id: string) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const task = await taskRepository.getTask(id, userId);
    if (!task) {
      return errorResponse({}, "Task not found.");
    }
    return successResponse({ task: task });
  } catch {
    return errorResponse({}, "Could not retrieve tasks.");
  }
}

export async function createTask(formInput: UpsertTaskInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }

    const validation = upsertTaskSchema.safeParse(formInput);
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

export async function updateTask(formInput: UpsertTaskInputs, taskId: string) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const validation = upsertTaskSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const updatedTask = await taskRepository.updateTask(
      validation.data,
      taskId,
      userId
    );

    if (!updatedTask) {
      return errorResponse({}, "Task not found.");
    }

    return successResponse({ task: updatedTask });
  } catch (error: unknown) {
    console.log(error);
    return errorResponse({}, "Something went wrong.");
  }
}

export async function deleteTask(formInput: DeleteTaskInput) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const validation = deleteTaskSchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const deletedTask = await taskRepository.deleteTask(
      validation.data,
      userId
    );

    if (!deletedTask) {
      return errorResponse({}, "Task not found.");
    }

    return successResponse({ task: deletedTask }, "Task deleted successfully!");
  } catch {
    return errorResponse({}, "Something went wrong.");
  }
}
