import { getTask } from "@/lib/services/task-service";

export async function fetchTask(taskId: string) {
  const response = await getTask(taskId, {
    includeCategory: true,
    includeSentHistory: true,
  });
  
  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
}
