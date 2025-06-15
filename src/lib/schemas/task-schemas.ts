import { z } from "zod/v4";

export const createTaskSchema = z.object({
  taskName: z.string(),
  desc: z.string().nullable(),
  deadline: z.date(),
  isToSend: z.boolean(),
});
export type CreateTaskInputs = z.infer<typeof createTaskSchema>;
