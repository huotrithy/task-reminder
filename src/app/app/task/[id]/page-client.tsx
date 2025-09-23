"use client";

import { useQuery } from "@tanstack/react-query";

import DetailButtonMenu from "@/components/float-btn/detail-menu-button";
import { deleteTask } from "@/lib/services/task-service";
import { formatDateToString } from "@/components/utils";
import {
  BellRing,
  CalendarDays,
  Grid2x2Plus,
  LayoutList,
  Pencil,
  Send,
} from "lucide-react";
import { fetchTask } from "./data";
import PageHeader from "@/components/page-header/page-header";
import MainContentWrapper from "@/components/main-content-wrapper";
import { useState } from "react";
import { TaskForm } from "@/components/task/task-form";

export default function PageClient({ taskId }: { taskId: string }) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["task"],
    queryFn: () => fetchTask(taskId),
  });

  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  if (isLoading) return <div>Loading task...</div>;
  if (isError || !data) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <PageHeader title="Task Detail" backLink="/app" />
      <MainContentWrapper>
        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
          {data?.task.taskName}
        </h4>
        <p className="leading-7 md:text-base text-sm">{data?.task.desc}</p>
        <h5 className="scroll-m-20 my-2 md:text-lg text-base font-medium tracking-tight">
          Deadline
        </h5>
        <div className="flex gap-3 items-center">
          <CalendarDays className="h-5 w-5" />
          <p className="leading-7 md:text-base text-sm">
            {formatDateToString(data?.task.deadline)}
          </p>
        </div>

        <h5 className="scroll-m-20 my-2 md:text-lg text-base font-medium tracking-tight">
          Notifications
        </h5>
        <div className="flex gap-3 items-center">
          <Send className="h-5 w-5" />
          <p className="leading-7 md:text-base text-sm">
            Notification {data?.task.isToSend ? "On" : "Off"}
          </p>
        </div>

        <h5 className="scroll-m-20 my-2 md:text-lg text-base font-medium tracking-tight">
          Category
        </h5>
        <div className="flex gap-3 items-center">
          <Grid2x2Plus className="h-5 w-5" />
          <p className="leading-7 md:text-base text-sm">
            {data?.task.Category?.categoryName}
          </p>
        </div>

        <h5 className="scroll-m-20 my-2 md:text-lg text-base font-medium tracking-tight">
          Others
        </h5>
        <div className="flex gap-3 items-center">
          <LayoutList className="h-5 w-5" />
          <p className="leading-7 md:text-base text-sm">
            Created Date - {formatDateToString(data?.task.createdAt)}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Pencil className="h-5 w-5" />
          <p className="leading-7 md:text-base text-sm">
            Last Update Date - {formatDateToString(data?.task.updatedAt)}
          </p>
        </div>

        <h5 className="scroll-m-20 my-2 md:text-lg text-base font-medium tracking-tight">
          Notifications History
        </h5>
        {data?.task.NotificationHistory &&
          data?.task.NotificationHistory.map((history, index) => {
            return (
              <div key={index} className="flex gap-3 items-center">
                <BellRing className="h-5 w-5" />
                <p className="leading-7 md:text-base text-sm">
                  {formatDateToString(history?.createdAt)}
                </p>
              </div>
            );
          })}
      </MainContentWrapper>

      <DetailButtonMenu
        deleteTitle={`Delete Task - ${data.task.taskName}`}
        deleteSuccessRedirectUrl={`/app/category/${data.task.categoryId}`}
        onDelete={() => deleteTask({ taskId: data.task.id })}
        setUpdateOpen={setOpenUpdateForm}
      />

      <TaskForm
        task={data.task}
        open={openUpdateForm}
        setOpen={setOpenUpdateForm}
        refetch={refetch}
      />
    </div>
  );
}
