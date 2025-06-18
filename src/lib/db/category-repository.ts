import { prisma } from "../prisma";
import {
  CreateCategoryInputs,
  UpdateCategoryInputs,
} from "../schemas/category-schema";

async function getCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
  return categories;
}

async function getCategory(categoryId: string, userId: string) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId: userId,
    },
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

export const categoryRepository = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
};
