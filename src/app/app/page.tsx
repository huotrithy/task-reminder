import { getCategories } from "@/lib/services/category-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AppClient from "./page-client";
import FloatButton from "@/components/flot-button";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AppClient />
      <FloatButton />
    </HydrationBoundary>
  );
}
