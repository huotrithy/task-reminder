import { prisma } from "../prisma";
import { CreateTaskInputs, DeleteTaskInput } from "../schemas/task-schemas";

async function getTasks(categoryId: string) {
  const tasks = await prisma.task.findMany({
    where: {
      categoryId: categoryId,
      isDelete: false,
    },
  });
  return tasks;
}

async function getTask(taskId: string, userId: string) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      isDelete: false,
      Category: {
        userId: userId,
      },
    },
  });

  return task;
}

async function createTask(taskData: CreateTaskInputs) {
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
  deleteTask,
};
