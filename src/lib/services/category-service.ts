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
import { errorResponse, successResponse } from "../utils";

export async function createCategory(formInput: CreateCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return redirect("/login");
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
      return redirect("/login");
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

export async function getCategories(
  categoryIncludeOptions?: CategoryIncludeOptions
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return redirect("/login");
    }
    const userId = session.user.id;

    const categories = await categoryRepository.getCategories(
      userId,
      categoryIncludeOptions
    );
    return successResponse({ categories: categories });
  } catch (error) {
    console.log(error);
    return errorResponse({}, "Something went wrong.");
  }
}

export async function getCategory(
  id: string,
  categoryIncludeOptions?: CategoryIncludeOptions
) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return redirect("/login");
    }
    const userId = session.user.id;

    const category = await categoryRepository.getCategory(
      id,
      userId,
      categoryIncludeOptions
    );
    if (!category) {
      return errorResponse({}, "Category not found.");
    }

    return successResponse({ category: category });
  } catch (error) {
    console.log(error);
    return errorResponse({}, "Something went wrong.");
  }
}

export async function deleteCategory(formInput: DeleteCategoryInputs) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return redirect("/login");
    }
    const userId = session.user.id;

    const validation = deleteCategorySchema.safeParse(formInput);
    if (!validation.success) {
      const fieldErrors = validation.error.message;
      return errorResponse({}, fieldErrors);
    }

    const categoryTask = await categoryRepository.getCategory(
      validation.data.categoryId,
      userId,
      { includeTask: true }
    );

    if (categoryTask) {
      return errorResponse(
        {},
        "You cannot delete this Cateogory, There are task under it."
      );
    }

    const deletedCategory = await categoryRepository.deleteCategory(
      validation.data,
      userId
    );

    return successResponse(
      { category: deletedCategory },
      "Category deleted successfully!"
    );
  } catch (error) {
    console.log(error);
    return errorResponse({}, "Something went wrong.");
  }
}
