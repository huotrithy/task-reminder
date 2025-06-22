"use client";

import { Category } from "@prisma/client";
import { TaskForm } from "./task-form";

interface Props {
  categories: Category[];
}

export function CreateTaskForm({ categories }: Props) {
  return <TaskForm categories={categories} />;
}
