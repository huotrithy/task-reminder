import { CreateTaskForm } from "@/components/task/create-form";
import { TitleHeader } from "@/components/title-header";
import { getCategories } from "@/lib/services/category-service";

export default async function Page() {
  const response = await getCategories();
  if (!response.success) {
    throw new Error(response.message || "An error has occured.");
  }

  return (
    <div>
      <TitleHeader title="Add new Task" backLink="/app" />
      <CreateTaskForm categories={response.data.categories} />
    </div>
  );
}
