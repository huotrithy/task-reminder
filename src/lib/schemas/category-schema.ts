import { z } from "zod/v4";

export const createCategorySchema = z.object({
  categoryName: z.string(),
});
export type CreateCategoryInputs = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  categoryName: z.string(),
  categoryId: z.uuid(),
});
export type UpdateCategoryInputs = z.infer<typeof updateCategorySchema>;
