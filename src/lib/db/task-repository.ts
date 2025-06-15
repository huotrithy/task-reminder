import { prisma } from "../prisma";
import { CreateTaskInputs } from "../schemas/task-schemas";

async function getTasks(userId: string) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });
  return tasks;
}

async function createTask(taskData: CreateTaskInputs, userId: string) {
  const createdTask = await prisma.task.create({
    data: {
      taskName: taskData.taskName,
      desc: taskData.desc,
      deadline: taskData.deadline,
      isToSend: taskData.isToSend,
      isDelete: false,
      userId: userId,
    },
  });
  return createdTask;
}

export const taskRepository = {
  getTasks,
  createTask,
};
