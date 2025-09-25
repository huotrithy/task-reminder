import { VALIDATION_ERROR_MESSAGE } from "@/shared/user-message";
import { z } from "zod/v4";

// Create schema
export const upsertTaskSchema = z
  .object({
    taskName: z.string().min(1, { message: "Task name cannot be empty." }),
    desc: z.string().nullish(),
    deadline: z.date().nullish(),
    isToSend: z.boolean(),

    reminderDeadline: z.date().nullish(),
    reminderPeriodDay: z
      .number()
      .int()
      .positive()
      .min(1)
      .max(90, {
        message: VALIDATION_ERROR_MESSAGE.REMINDER_PERIOD_BIGGER_THAN_3_MONTH,
      })
      .nullish(),

    categoryId: z.cuid().min(1, { message: "Invalid Category" }),
  })
  .check((ctx) => {
    if (ctx.value.isToSend === true) {
      if (!ctx.value.reminderDeadline) {
        ctx.issues.push({
          code: "custom",
          message: VALIDATION_ERROR_MESSAGE.REMINDER_DEADLINE_NOT_SET,
          input: ctx.value.reminderDeadline,
          path: ["reminderDeadline"],
        });
      }

      if (!ctx.value.reminderPeriodDay) {
        ctx.issues.push({
          code: "custom",
          message: VALIDATION_ERROR_MESSAGE.REMINDER_PERIOD_NOT_SET,
          input: ctx.value.reminderPeriodDay,
          path: ["reminderPeriodDay"],
        });
      }
    }
  });

export type UpsertTaskInputs = z.infer<typeof upsertTaskSchema>;

// Delete schema
export const deleteTaskSchema = z.object({
  taskId: z.cuid(),
});
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;

// Retreive
export interface TaskIncludeOptions {
  includeCategory?: boolean;
  includeSentHistory?: boolean;
}
