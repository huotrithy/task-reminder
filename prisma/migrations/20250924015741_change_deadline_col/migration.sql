/*
  Warnings:

  - Made the column `taskToCompletedBy` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "deadline" DROP NOT NULL,
ALTER COLUMN "taskToCompletedBy" SET NOT NULL;
