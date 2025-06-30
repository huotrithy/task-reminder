import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PageClient from "./page-client";
import { fetchCategory } from "./data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const categoryId = id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageClient categoryId={categoryId} />
    </HydrationBoundary>
  );
}
