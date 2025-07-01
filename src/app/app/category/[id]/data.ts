import { getCategory } from "@/lib/services/category-service";

export async function fetchCategory(categoryId: string) {
  const response = await getCategory(categoryId, { includeTask: true });
  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
}
