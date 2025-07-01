import { z } from "zod/v4";

export const upsertTelegramChatIDSchema = z.object({
  telegram_chat_id: z.string().min(1, { message: "Chat ID cannot be empty." }),
});

export type upsertTelegramChatIDInputs = z.infer<
  typeof upsertTelegramChatIDSchema
>;
