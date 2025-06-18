import { z } from "zod/v4";

export const createCategorySchema = z.object({
  categoryName: z.string(),
});
export type CreateCategoryInputs = z.infer<typeof createCategorySchema>;
