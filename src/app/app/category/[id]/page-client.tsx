"use client";

import { TitleHeader } from "@/components/title-header";
import DetailButtonMenu from "@/components/detail-menu-button";
import { deleteCategory } from "@/lib/services/category-service";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "./page";

export default function PageClient({ categoryId }: { categoryId: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <TitleHeader title="Category Detail" backLink="/app" />

      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        {data?.category.categoryName}
      </h2>

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
