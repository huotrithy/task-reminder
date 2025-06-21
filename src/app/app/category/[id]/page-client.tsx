"use client";

import { TitleHeader } from "@/components/title-header";
import DetailButtonMenu from "@/components/detail-menu-button";
import { deleteCategory } from "@/lib/services/category-service";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "./page";
import { TaskList } from "@/components/category/task-list";

export default function PageClient({ categoryId }: { categoryId: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <TitleHeader
        title={data?.category.categoryName}
        subTitle={`${data?.category.task.length} Tasks`}
        backLink="/app"
      />
      <TaskList tasks={data?.category.task} />
      {data?.category && (
        <DetailButtonMenu
          updateUrl={`/app/category/update/${data.category.id}`}
          deleteTitle="Delete Category"
          deleteSuccessRedirectUrl="/app"
          onDelete={() => deleteCategory({ categoryId: data.category.id })}
        />
      )}
    </div>
  );
}
