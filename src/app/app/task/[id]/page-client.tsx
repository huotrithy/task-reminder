"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { ErrorDisplay } from "@/components/error-display";

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

  const [pageTitle, setPageTitle] = useState<string>();
  const pageDesc = "View your task details";
  const [backLink, setBackLink] = useState<string>();

  useEffect(() => {
    if (data?.task) {
      setPageTitle(`Task - ${data.task.taskName}`);
      setBackLink(`/app/category/${data.task.categoryId}`);
    }
  }, [data]);

  return (
    <>
      <PageHeader title={pageTitle} desc={pageDesc} backLink={backLink} />
      <MdPageHeader title={pageTitle} desc={pageDesc} backLink={backLink} />

      <MainContentWrapper>
        {isLoading && <Spinner variant="ellipsis" />}

        {isError && <ErrorDisplay errorMsg={error.message} />}

        {!isLoading && !isError && data && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            {data.task.desc && (
              <p className="leading-7 md:text-base text-sm text-gray-800">
                {data.task.desc}
              </p>
            )}

            {data.task.deadline && (
              <>
                <SectionHeading>Deadline</SectionHeading>
                <InfoRow icon={CalendarDays}>
                  {formatDateToString(data.task.deadline)}
                </InfoRow>
              </>
            )}

            <SectionHeading>Notifications</SectionHeading>
            <InfoRow icon={Send}>
              Notification {data.task.isToSend ? "On" : "Off"}
            </InfoRow>

            {data.task.isToSend && (
              <>
                <InfoRow icon={CalendarDays}>
                  Reminder Deadline -{" "}
                  {formatDateToString(data.task.reminderDeadline)}
                </InfoRow>
                <InfoRow icon={ClockFading}>
                  Reminder Period -{" "}
                  {`${data.task.reminderPeriodDay} ${
                    data.task.reminderPeriodDay &&
                    data.task.reminderPeriodDay > 1
                      ? "days"
                      : "day"
                  }`}
                </InfoRow>
              </>
            )}

            <SectionHeading>Category</SectionHeading>
            <InfoRow icon={Grid2x2Plus}>
              {data.task.Category?.categoryName}
            </InfoRow>

            <SectionHeading>Others</SectionHeading>
            <InfoRow icon={LayoutList}>
              Created Date - {formatDateToString(data.task.createdAt)}
            </InfoRow>
            <InfoRow icon={Pencil}>
              Last Update Date - {formatDateToString(data.task.updatedAt)}
            </InfoRow>

            {data.task.NotificationHistory &&
              data.task.NotificationHistory.length > 0 && (
                <>
                  <SectionHeading>Notifications History</SectionHeading>
                  {data.task.NotificationHistory.map((history, index) => (
                    <InfoRow key={index} icon={BellRing}>
                      {formatDateToString(history?.createdAt)}
                    </InfoRow>
                  ))}
                </>
              )}
          </div>
        )}
      </MainContentWrapper>

      {data && (
        <>
          {" "}
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
        </>
      )}
    </>
  );
}
