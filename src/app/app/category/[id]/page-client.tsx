"use client";

import DetailButtonMenu from "@/components/float-btn/detail-menu-button";
import { deleteCategory } from "@/lib/services/category-service";
import { useQuery } from "@tanstack/react-query";
import { TaskList } from "@/components/category/task-list";
import { fetchCategory } from "./data";
import PageHeader from "@/components/page-header/page-header";
import MainContentWrapper from "@/components/main-content-wrapper";
import { UpdateCategoryForm } from "@/components/category/update-form";
import { useState } from "react";
import MdPageHeader from "@/components/page-header/md-page-header";

export default function PageClient({ categoryId }: { categoryId: string }) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
  });

  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError || !data) return <div>Error: {error?.message}</div>;

  const pageTitle = `Category - ${data.category.categoryName}`;
  const pageDesc = `${data.category.task.length} Tasks`;

  return (
    <div>
      <PageHeader title={pageTitle} desc={pageDesc} backLink="/app" />
      <MdPageHeader title={pageTitle} desc={pageDesc} backLink="/app" />
      <MainContentWrapper>
        <TaskList tasks={data.category.task} />
      </MainContentWrapper>

      <DetailButtonMenu
        deleteTitle="Delete Category"
        deleteSuccessRedirectUrl="/app"
        onDelete={() => deleteCategory({ categoryId: data.category.id })}
        setUpdateOpen={setOpenUpdateForm}
      />

      <UpdateCategoryForm
        initialData={data.category}
        open={openUpdateForm}
        setOpen={setOpenUpdateForm}
        refetch={refetch}
      />
    </div>
  );
}
