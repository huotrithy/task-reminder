-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telegram_chat_id" TEXT,
    "within_days_to_send" INTEGER NOT NULL DEFAULT 30,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_name" TEXT NOT NULL,
    "is_delete" BOOLEAN NOT NULL,
    "user_id" TEXT,
    CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "task_name" TEXT NOT NULL,
    "desc" TEXT,
    "deadline" DATETIME NOT NULL,
    "is_delete" BOOLEAN NOT NULL,
    "is_to_send" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "task_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notification_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "task_name" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "task_id" TEXT NOT NULL,
    CONSTRAINT "notification_history_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
