/*
  Warnings:

  - You are about to drop the column `reminderDeadline` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `reminderPeriodDay` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "reminderDeadline",
DROP COLUMN "reminderPeriodDay",
ADD COLUMN     "reminder_deadline" TIMESTAMP(3),
ADD COLUMN     "reminder_period_day" INTEGER;
