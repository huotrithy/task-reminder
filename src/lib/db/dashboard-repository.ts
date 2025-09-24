import { prisma } from "../prisma";

export async function getNumTaskByCategory(userId: string) {
  const numTasks = await prisma.category.findMany({
    where: {
      userId: userId,
      isDelete: false,
    },
    select: {
      categoryName: true,
      _count: {
        select: {
          task: {
            where: {
              isDelete: false,
            },
          },
        },
      },
    },
  });

  return numTasks;
}
