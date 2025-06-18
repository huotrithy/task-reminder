"use server";

import { getServerAuthSession } from "../auth";
import { categoryRepository } from "../db/category-repository";
import {
  CreateCategoryInputs,
  createCategorySchema,
} from "../schemas/category-schema";
import { errorResponse, successResponse } from "../utils";

export async function createCategory(formInput: CreateCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const validation = createCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const createdCategory = await categoryRepository.createCategory(
      validation.data,
      userId
    );

    return successResponse({ category: createdCategory });
  } catch (error: unknown) {
    console.log(error);
    return errorResponse({}, "Something went wrong.");
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
    return errorResponse({}, "Something went wrong.");
  }
}
