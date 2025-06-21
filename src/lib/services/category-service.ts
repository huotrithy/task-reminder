"use server";

import { getServerAuthSession } from "../auth";
import { categoryRepository } from "../db/category-repository";
import {
  CreateCategoryInputs,
  createCategorySchema,
  DeleteCategoryInputs,
  deleteCategorySchema,
  UpdateCategoryInputs,
  updateCategorySchema,
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

export async function updateCategory(formInput: UpdateCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }

    const validation = updateCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const updatedCategory = await categoryRepository.updateCategory(
      validation.data
    );
    return successResponse({ category: updatedCategory });
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

export async function getCategory(id: string) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const category = await categoryRepository.getCategory(id, userId);
    if (!category) {
      return errorResponse({}, "Category not found.");
    }
    console.log(category);

    return successResponse({ category: category });
  } catch {
    return errorResponse({}, "Something went wrong.");
  }
}

export async function deleteCategory(formInput: DeleteCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return errorResponse({}, "Unauthorize operation.");
    }
    const userId = session.user.id;

    const validation = deleteCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const deletedCategory = await categoryRepository.deleteCategory(
      validation.data,
      userId
    );

    return successResponse(
      { category: deletedCategory },
      "Category deleted successfully!"
    );
  } catch {
    return errorResponse({}, "Something went wrong.");
  }
}
