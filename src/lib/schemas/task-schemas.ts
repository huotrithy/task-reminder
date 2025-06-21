import { z } from "zod/v4";

export const createTaskSchema = z.object({
  taskName: z.string().min(1, { message: "Task name cannot be empty." }),
  desc: z.string().optional(),
  deadline: z.date(),
  isToSend: z.boolean(),
  categoryId: z.cuid().min(1, { message: "Invalid Category" }),
});
export type CreateTaskInputs = z.infer<typeof createTaskSchema>;
