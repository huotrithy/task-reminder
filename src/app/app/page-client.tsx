"use client";

import { getCategories } from "@/lib/services/category-service";
import { useQuery } from "@tanstack/react-query";

export default function AppClient() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await getCategories();
      if (response.success) {
        return await response.data;
      }
      throw new Error(response.message || "An error has occured.");
    },
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
      {data?.categories &&
        data.categories.map((category, index) => (
          <div className="flex items-center gap-4" key={index}>
            <div
              className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f5] shrink-0 size-12"
              // dataIcon="List"
              // dataSize="24px"
              // dataWeight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                Grocery Shopping
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
                Due Today
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
