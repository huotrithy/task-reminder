import { getCategory } from "@/lib/services/category-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PageClient from "./page-client";

interface Props {
  params: { id: string };
}

export async function fetchCategory(categoryId: string) {
  const response = await getCategory(categoryId);
  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
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
