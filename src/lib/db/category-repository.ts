import { prisma } from "../prisma";
import { CreateCategoryInputs } from "../schemas/category-schema";

async function getCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
  return categories;
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

export const categoryRepository = {
  createCategory,
  getCategories,
};
