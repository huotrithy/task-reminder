import { prisma } from "../prisma";
import { CreateTaskInputs } from "../schemas/task-schemas";

async function getTasks(categoryId: string) {
  const tasks = await prisma.task.findMany({
    where: {
      categoryId: categoryId,
    },
  });
  return tasks;
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

export const taskRepository = {
  getTasks,
  createTask,
};
