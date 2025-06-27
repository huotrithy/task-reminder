-- CreateTable
CREATE TABLE "notification_history" (
    "id" TEXT NOT NULL,
    "task_name" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "task_id" TEXT NOT NULL,

    CONSTRAINT "notification_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
