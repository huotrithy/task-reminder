import { getTask } from "@/lib/services/task-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PageClient from "./page-client";

interface Props {
  params: { id: string };
}

export async function fetchTask(taskId: string) {
  const response = await getTask(taskId);
  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const taskId = id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["task"],
    queryFn: () => fetchTask(taskId),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageClient taskId={taskId} />
    </HydrationBoundary>
  );
}
