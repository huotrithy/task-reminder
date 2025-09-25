/*
  Warnings:

  - You are about to drop the column `within_days_to_send` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "within_days_to_send",
ADD COLUMN     "withinDaysToSend" INTEGER NOT NULL DEFAULT 30;
