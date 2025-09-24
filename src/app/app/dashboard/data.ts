import {
  getTaskByCategory,
  getTaskDeadlineProximity,
} from "@/lib/services/dashboard-service";
import { ERROR_MESSAGE } from "@/shared/user-message";

export async function fetchTasksByCategory() {
  const response = await getTaskByCategory();

  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || ERROR_MESSAGE.SERVER_ERROR);
}

export async function fetchTaskDeadlineProximity() {
  const response = await getTaskDeadlineProximity();

  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || ERROR_MESSAGE.SERVER_ERROR);
}
