"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "./page";
import { CategoryListItem } from "@/components/app/category-list-item";
import { Separator } from "@/components/ui/separator";
import { usePreviousRoute } from "@/hooks/previous-route";

export default function AppClient() {
  usePreviousRoute();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <h1 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        All Tasks
      </h1>
      <Separator className="mb-2" />
      <div className="flex flex-col justify-start gap-4 bg-white min-h-[72px] py-2 ">
        {data?.categories &&
          data.categories.map((category, index) => (
            <CategoryListItem category={category} key={index} />
          ))}
      </div>
    </>
  );
}
