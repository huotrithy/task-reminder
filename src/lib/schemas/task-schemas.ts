import { z } from "zod/v4";

// Create schema
export const upsertTaskSchema = z.object({
  taskName: z.string().min(1, { message: "Task name cannot be empty." }),
  desc: z.string().nullish(),
  deadline: z.date(),
  isToSend: z.boolean(),
  categoryId: z.cuid().min(1, { message: "Invalid Category" }),
});
export type UpsertTaskInputs = z.infer<typeof upsertTaskSchema>;

// Delete schema
export const deleteTaskSchema = z.object({
  taskId: z.cuid(),
});
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;

// Update schema
// export const updateTaskSchema = z.object({
//   taskId: z.cuid(),
//   taskName: z.string().min(1, { message: "Task name cannot be empty." }),
//   desc: z.string().nullish(),
//   deadline: z.date(),
//   isToSend: z.boolean(),
//   categoryId: z.cuid().min(1, { message: "Invalid Category" }),
// });
// export type UpdateTaskInputs = z.infer<typeof updateTaskSchema>;

// Retreive
export interface TaskIncludeOptions {
  includeCategory?: boolean;
}
