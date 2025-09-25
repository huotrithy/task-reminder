import { prisma } from "../prisma";

export async function dbGetNumTaskByCategory(userId: string) {
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

export async function dbGetTaskDeadlineProximity(userId: string) {
  const now = new Date();

  const valConvertToMillisec = 24 * 60 * 60 * 1000;
  const oneWeekFromNow = new Date(now.getTime() + 7 * valConvertToMillisec);
  const twoWeeksFromNow = new Date(now.getTime() + 14 * valConvertToMillisec);
  const oneMonthFromNow = new Date(now.getTime() + 14 * valConvertToMillisec);

  const whereOptions = {
    Category: {
      userId: userId,
    },
    isDelete: false,
  };

  const selectOption = {
    taskName: true,
    deadline: true,
    id: true,
    Category: {
      select: {
        categoryName: true,
      },
    },
  };

  const result = await prisma.$transaction(async (tx) => {
    const numOverdue = await tx.task.findMany({
      where: {
        ...whereOptions,
        deadline: {
          // 'less than' the current date
          lt: now,
        },
      },
      select: selectOption,
    });

    const numDueThisWeek = await tx.task.findMany({
      where: {
        ...whereOptions,
        deadline: {
          // 'greater than or equal to' the current date
          gte: now,
          // 'less than' one week from now
          lt: oneWeekFromNow,
        },
      },
      select: selectOption,
    });

    const numDueTwoWeek = await tx.task.findMany({
      where: {
        ...whereOptions,
        deadline: {
          gte: oneWeekFromNow,
          lt: twoWeeksFromNow,
        },
      },
      select: selectOption,
    });

    const numDueThisMonth = await tx.task.findMany({
      where: {
        ...whereOptions,
        deadline: {
          gte: twoWeeksFromNow,
          lt: oneMonthFromNow,
        },
      },
      select: selectOption,
    });

    const moreDueThanAMonth = await tx.task.findMany({
      where: {
        ...whereOptions,
        deadline: {
          gte: oneMonthFromNow,
        },
      },
      select: selectOption,
    });

    const numNoDeadline = await tx.task.findMany({
      where: {
        ...whereOptions,
        deadline: null,
      },
      select: selectOption,
    });

    return {
      numOverdue,
      numDueThisWeek,
      numDueTwoWeek,
      numDueThisMonth,
      moreDueThanAMonth,
      numNoDeadline,
    };
  });

  return result;
}
