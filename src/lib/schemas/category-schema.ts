import { z } from "zod/v4";

export const createCategorySchema = z.object({
  categoryName: z
    .string()
    .min(1, { message: "Category name cannot be empty." }),
});
export type CreateCategoryInputs = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  categoryName: z
    .string()
    .min(1, { message: "Category name cannot be empty." }),
  categoryId: z.cuid(),
});
export type UpdateCategoryInputs = z.infer<typeof updateCategorySchema>;

export const deleteCategorySchema = z.object({
  categoryId: z.cuid(),
});
export type DeleteCategoryInputs = z.infer<typeof deleteCategorySchema>;
