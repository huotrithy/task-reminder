"use client";

import { Category, Task } from "@prisma/client";
import { TaskForm } from "./task-form";

interface Props {
  task: Task;
  categories: Category[];
}

export function UpdateTaskForm({ task, categories }: Props) {
  return <TaskForm categories={categories} task={task} />;
}
