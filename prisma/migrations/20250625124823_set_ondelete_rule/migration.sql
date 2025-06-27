/*
  Warnings:

  - You are about to drop the column `categoryId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_categoryId_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
