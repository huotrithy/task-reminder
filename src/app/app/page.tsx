import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AppClient from "./page-client";
import AddButtonMenu from "@/components/add-menu-button";
import { fetchCategory } from "./data";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
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
