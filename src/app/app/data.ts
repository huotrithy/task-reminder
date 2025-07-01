import { getCategories } from "@/lib/services/category-service";

export async function fetchCategory() {
  const response = await getCategories({ includeTask: true });
  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
}
