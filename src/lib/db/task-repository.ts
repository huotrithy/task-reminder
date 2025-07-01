import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import {
  DeleteTaskInput,
  TaskIncludeOptions,
  UpsertTaskInputs,
} from "../schemas/task-schemas";

async function getTasks(categoryId: string) {
  const tasks = await prisma.task.findMany({
    where: {
      categoryId: categoryId,
      isDelete: false,
    },
  });
  return tasks;
}

async function getTask(
  taskId: string,
  userId: string,
  includeOptions?: TaskIncludeOptions
) {
  const include: Prisma.TaskInclude = {};
  if (includeOptions?.includeCategory) {
    include.Category = true;
  }

  if (includeOptions?.includeSentHistory) {
    include.NotificationHistory = {
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    };
  }

  const query = Prisma.validator<Prisma.TaskDefaultArgs>()({
    include: include,
  });

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      isDelete: false,
      Category: {
        userId: userId,
      },
    },
    ...query,
  });

  return task;
}

async function createTask(taskData: UpsertTaskInputs) {
  const createdTask = await prisma.task.create({
    data: {
      taskName: taskData.taskName,
      desc: taskData.desc,
      deadline: taskData.deadline,
      isToSend: taskData.isToSend,
      isDelete: false,
      categoryId: taskData.categoryId,
    },
  });
  return createdTask;
}

async function updateTask(
  taskData: UpsertTaskInputs,
  taskId: string,
  userId: string
) {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
      Category: {
        userId: userId,
      },
    },
    data: {
      taskName: taskData.taskName,
      desc: taskData.desc,
      deadline: taskData.deadline,
      isToSend: taskData.isToSend,
      categoryId: taskData.categoryId,
    },
  });

  return updatedTask;
}

async function deleteTask(taskData: DeleteTaskInput, userId: string) {
  const deletedTask = await prisma.task.update({
    where: {
      id: taskData.taskId,
      Category: {
        userId: userId,
      },
    },
    data: {
      isDelete: true,
    },
  });

  return deletedTask;
}

export const taskRepository = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
