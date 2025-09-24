import { getTaskByCategory } from "@/lib/services/dashboard-service";

export async function fetchTasksByCategory() {
  const response = await getTaskByCategory();

  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
}
