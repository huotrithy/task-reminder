import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import {
  CategoryIncludeOptions,
  CreateCategoryInputs,
  DeleteCategoryInputs,
  UpdateCategoryInputs,
} from "../schemas/category-schema";

async function getCategories(
  userId: string,
  includeOptions?: CategoryIncludeOptions
) {
  // Dynamically include object
  const include: Prisma.CategoryInclude = {};
  if (includeOptions?.includeTask) {
    include.task = {
      where: {
        isDelete: false,
      },
    };
  }
  if (includeOptions?.includeUser) {
    include.User = true;
  }

  const query = Prisma.validator<Prisma.CategoryDefaultArgs>()({
    include: include,
  });

  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
      isDelete: false,
    },
    ...query,
  });

  return categories;
}

async function getCategory(
  categoryId: string,
  userId: string,
  includeOptions?: CategoryIncludeOptions
) {
  const include: Prisma.CategoryInclude = {};
  if (includeOptions?.includeTask) {
    include.task = {
      where: {
        isDelete: false,
      },
    };
  }
  if (includeOptions?.includeUser) {
    include.User = true;
  }

  const query = Prisma.validator<Prisma.CategoryDefaultArgs>()({
    include: include,
  });

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId: userId,
      isDelete: false,
    },
    ...query,
  });
  return category;
}

async function createCategory(
  categoryData: CreateCategoryInputs,
  userId: string
) {
  const createdCategory = await prisma.category.create({
    data: {
      categoryName: categoryData.categoryName,
      isDelete: false,
      userId: userId,
    },
  });
  return createdCategory;
}

async function updateCategory(categoryData: UpdateCategoryInputs) {
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryData.categoryId,
    },
    data: {
      categoryName: categoryData.categoryName,
    },
  });
  return updatedCategory;
}

async function deleteCategory(
  categoryData: DeleteCategoryInputs,
  userId: string
) {
  const deletedCategory = await prisma.category.update({
    where: {
      id: categoryData.categoryId,
      userId: userId,
    },
    data: {
      isDelete: true,
    },
  });

  return deletedCategory;
}

export const categoryRepository = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
