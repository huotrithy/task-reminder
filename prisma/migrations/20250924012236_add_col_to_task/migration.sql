/*
  Warnings:

  - You are about to drop the column `within_days_to_send` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "taskToCompletedBy" TIMESTAMP(3),
ADD COLUMN     "within_days_to_send" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "within_days_to_send";
