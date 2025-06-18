import { getCategories } from "@/lib/services/category-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AppClient from "./page-client";
import AddButtonMenu from "@/components/add-menu-button";

export async function fetchCategory() {
  const response = await getCategories();
  if (response.success) {
    return response.data;
  }

  throw new Error(response.message || "An error has occured.");
}

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AppClient />
      <AddButtonMenu />
    </HydrationBoundary>
  );
}
