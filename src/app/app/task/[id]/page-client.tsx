"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import DetailButtonMenu from "@/components/float-btn/detail-menu-button";
import { deleteTask } from "@/lib/services/task-service";
import { formatDateToString } from "@/components/utils";
import {
  BellRing,
  CalendarDays,
  ClockFading,
  Grid2x2Plus,
  LayoutList,
  Pencil,
  Send,
} from "lucide-react";
import { fetchTask } from "./data";
import PageHeader from "@/components/page-header/page-header";
import MainContentWrapper from "@/components/main-content-wrapper";
import { TaskForm } from "@/components/task/task-form";
import MdPageHeader from "@/components/page-header/md-page-header";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="scroll-m-20 mt-6 mb-2 text-base md:text-lg font-semibold tracking-tight text-primary">
      {children}
    </h5>
  );
}

function InfoRow({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50 transition">
      <Icon className="h-5 w-5 text-gray-500" />
      <p className="leading-7 text-sm md:text-base text-gray-700">{children}</p>
    </div>
  );
}

export default function PageClient({ taskId }: { taskId: string }) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
  });

  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  if (isLoading) return <div className="p-4">Loading task…</div>;
  if (isError || !data)
    return <div className="p-4 text-red-500">Error: {error?.message}</div>;

  const task = data.task;
  const pageTitle = `Task - ${task.taskName}`;
  const pageDesc = "View your task details";
  const backLink = `/app/category/${task.categoryId}`;

  return (
    <>
      <PageHeader title={pageTitle} desc={pageDesc} backLink={backLink} />
      <MdPageHeader title={pageTitle} desc={pageDesc} backLink={backLink} />

      <MainContentWrapper>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          {task.desc && (
            <p className="leading-7 md:text-base text-sm text-gray-800">
              {task.desc}
            </p>
          )}

          {task.deadline && (
            <>
              <SectionHeading>Deadline</SectionHeading>
              <InfoRow icon={CalendarDays}>
                {formatDateToString(task.deadline)}
              </InfoRow>
            </>
          )}

          <SectionHeading>Notifications</SectionHeading>
          <InfoRow icon={Send}>
            Notification {task.isToSend ? "On" : "Off"}
          </InfoRow>

          {task.isToSend && (
            <>
              <InfoRow icon={CalendarDays}>
                Reminder Deadline - {formatDateToString(task.reminderDeadline)}
              </InfoRow>
              <InfoRow icon={ClockFading}>
                Reminder Period -{" "}
                {`${task.reminderPeriodDay} ${
                  task.reminderPeriodDay && task.reminderPeriodDay > 1
                    ? "days"
                    : "day"
                }`}
              </InfoRow>
            </>
          )}

          <SectionHeading>Category</SectionHeading>
          <InfoRow icon={Grid2x2Plus}>{task.Category?.categoryName}</InfoRow>

          <SectionHeading>Others</SectionHeading>
          <InfoRow icon={LayoutList}>
            Created Date - {formatDateToString(task.createdAt)}
          </InfoRow>
          <InfoRow icon={Pencil}>
            Last Update Date - {formatDateToString(task.updatedAt)}
          </InfoRow>

          {task.NotificationHistory && task.NotificationHistory.length > 0 && (
            <>
              <SectionHeading>Notifications History</SectionHeading>
              {task.NotificationHistory.map((history, index) => (
                <InfoRow key={index} icon={BellRing}>
                  {formatDateToString(history?.createdAt)}
                </InfoRow>
              ))}
            </>
          )}
        </div>
      </MainContentWrapper>

      <DetailButtonMenu
        deleteTitle={`Delete Task - ${task.taskName}`}
        deleteSuccessRedirectUrl={`/app/category/${task.categoryId}`}
        onDelete={() => deleteTask({ taskId: task.id })}
        setUpdateOpen={setOpenUpdateForm}
      />

      <TaskForm
        task={task}
        open={openUpdateForm}
        setOpen={setOpenUpdateForm}
        refetch={refetch}
      />
    </>
  );
}
