import { TaskForm } from "@/components/task/task-form";
import { TitleHeader } from "@/components/title-header";

export default async function Page() {
  return (
    <div>
      <TitleHeader title="Add new Task" backLink="/app" />
      <TaskForm />
    </div>
  );
}
