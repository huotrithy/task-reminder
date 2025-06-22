"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "./page";
import { TitleHeader } from "@/components/title-header";
import DetailButtonMenu from "@/components/detail-menu-button";
import { deleteTask } from "@/lib/services/task-service";

export default function PageClient({ taskId }: { taskId: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["task"],
    queryFn: () => fetchTask(taskId),
  });

  if (isLoading) return <div>Loading task...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <TitleHeader title={data?.task.taskName} backLink="/app" />
      {data?.task && (
        <DetailButtonMenu
          updateUrl={`/app/task/update/${data.task.id}`}
          deleteTitle="Delete Task"
          deleteSuccessRedirectUrl={`/app/category/${data.task.categoryId}`}
          onDelete={() => deleteTask({ taskId: data.task.id })}
        />
      )}
    </div>
  );
}
