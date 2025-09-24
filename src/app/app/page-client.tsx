"use client";

import { useQuery } from "@tanstack/react-query";
import { CategoryListItem } from "@/components/app/category-list-item";
import { usePreviousRoute } from "@/hooks/previous-route";
import { fetchCategory } from "./data";
import PageHeader from "@/components/page-header/page-header";
import MainContentWrapper from "@/components/main-content-wrapper";
import { CreateCategoryForm } from "@/components/category/create-form";
import AddButtonMenu from "@/components/float-btn/add-menu-button";
import { useState } from "react";
import { TaskForm } from "@/components/task/task-form";

export default function AppClient() {
  usePreviousRoute();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  const [openCreateCategoryForm, setOpenCreateCategoryForm] = useState(false);
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <PageHeader title="Home" desc="Keep track of your tasks" />
      <MainContentWrapper>
        <div className="flex flex-col justify-start gap-4 bg-white min-h-[72px] py-2 ">
          {data?.categories &&
            data.categories.map((category, index) => (
              <CategoryListItem category={category} key={index} />
            ))}

          <AddButtonMenu
            setOpenCreateCategoryForm={setOpenCreateCategoryForm}
            setOpenCreateTaskForm={setOpenCreateTaskForm}
          />
        </div>
      </MainContentWrapper>

      <CreateCategoryForm
        open={openCreateCategoryForm}
        setOpen={setOpenCreateCategoryForm}
        refect={refetch}
      />

      <TaskForm
        open={openCreateTaskForm}
        setOpen={setOpenCreateTaskForm}
        refetch={refetch}
      />
    </>
  );
}
