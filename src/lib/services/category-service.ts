"use server";

import { getServerAuthSession } from "../auth";
import { categoryRepository } from "../db/category-repository";
import { createCategorySchema } from "../schemas/category-schema";
import { errorResponse, successResponse } from "../utils";

export async function createCategory(formData: FormData) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const formInput = {
      categoryName: formData.get("category-name"),
    };

    const validation = createCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const createdTask = categoryRepository.createCategory(
      validation.data,
      userId
    );
    return successResponse({ task: createdTask });
  } catch (error: unknown) {
    console.log(error);
    return errorResponse({}, "Could not retrieve tasks.");
  }
}

export async function getCategories() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const categories = await categoryRepository.getCategories(userId);
    return successResponse({ categories: categories });
  } catch {
    return errorResponse({}, "Could not retrieve tasks.");
  }
}
