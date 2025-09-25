/*
  Warnings:

  - You are about to drop the column `taskToCompletedBy` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `withinDaysToSend` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "taskToCompletedBy",
DROP COLUMN "withinDaysToSend",
ADD COLUMN     "reminderDeadline" TIMESTAMP(3),
ADD COLUMN     "reminderPeriodDay" INTEGER;
