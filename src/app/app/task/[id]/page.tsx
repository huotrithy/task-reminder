import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PageClient from "./page-client";
import { fetchTask } from "./data";

interface Props {
  params: Promise<{ id: string }>;
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
