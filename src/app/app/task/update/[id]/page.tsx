import { TaskForm } from "@/components/task/task-form";
import { TitleHeader } from "@/components/title-header";
import { getCategories } from "@/lib/services/category-service";
import { getTask } from "@/lib/services/task-service";
import { toast } from "sonner";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const taskResponse = await getTask(id);

  if (!taskResponse.success) {
    toast.error(taskResponse.message);
    throw new Error(taskResponse.message);
  }

  const categoryResponse = await getCategories();
  if (!categoryResponse.success) {
    throw new Error(categoryResponse.message || "An error has occured.");
  }

  return (
    <div>
      <TitleHeader title="Update Task" backLink={`/app/task/${id}`} />
      <TaskForm task={taskResponse.data.task} />
    </div>
  );
}
