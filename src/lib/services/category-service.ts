"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import { categoryRepository } from "../db/category-repository";
import {
  CategoryIncludeOptions,
  CreateCategoryInputs,
  createCategorySchema,
  DeleteCategoryInputs,
  deleteCategorySchema,
  UpdateCategoryInputs,
  updateCategorySchema,
} from "../schemas/category-schema";
import { errorResponse, successResponse } from "../serverUtils";
import { logger } from "../logger";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../user-message";

export async function createCategory(formInput: CreateCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const validation = createCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const createdCategory = await categoryRepository.createCategory(
      validation.data,
      userId
    );

    return successResponse({ category: createdCategory });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function updateCategory(formInput: UpdateCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }

    const validation = updateCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const updatedCategory = await categoryRepository.updateCategory(
      validation.data
    );
    return successResponse({ category: updatedCategory });
  } catch (error: unknown) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function getCategories(
  categoryIncludeOptions?: CategoryIncludeOptions
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const categories = await categoryRepository.getCategories(
      userId,
      categoryIncludeOptions
    );
    return successResponse({ categories: categories });
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function getCategory(
  id: string,
  categoryIncludeOptions?: CategoryIncludeOptions
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const category = await categoryRepository.getCategory(
      id,
      userId,
      categoryIncludeOptions
    );
    if (!category) {
      logger.error(ERROR_MESSAGE.CATEGORY_NOT_FOUND);
      return errorResponse(ERROR_MESSAGE.CATEGORY_NOT_FOUND);
    }

    return successResponse({ category: category });
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}

export async function deleteCategory(formInput: DeleteCategoryInputs) {
  try {
    logger.info(formInput);

    const session = await getServerAuthSession();
    if (!session) {
      logger.error(ERROR_MESSAGE.UNAUTHENTICATED);
      return redirect("/login");
    }
    const userId = session.user.id;

    const validation = deleteCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      logger.error(fieldErrors);
      return errorResponse(fieldErrors);
    }

    const categoryTask = await categoryRepository.getCategory(
      validation.data.categoryId,
      userId,
      { includeTask: true }
    );

    if (categoryTask?.task && categoryTask?.task.length > 0) {
      logger.warn(ERROR_MESSAGE.DELETE_ACTIVE_CATEGORY);
      return errorResponse(ERROR_MESSAGE.DELETE_ACTIVE_CATEGORY);
    }

    const deletedCategory = await categoryRepository.deleteCategory(
      validation.data,
      userId
    );

    return successResponse(
      { category: deletedCategory },
      SUCCESS_MESSAGE.DELETE_CATEGORY
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(ERROR_MESSAGE.SERVER_ERROR);
  }
}
