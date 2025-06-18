"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "./page";
import Link from "next/link";

export default function AppClient() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Tasks
      </h2>
      <div className="flex flex-col justify-start gap-4 bg-white min-h-[72px] py-2">
        {data?.categories &&
          data.categories.map((category, index) => (
            <div className="flex items-center gap-4" key={index}>
              <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f5] shrink-0 size-12">
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
                <Link href={`/app/category/${category.id}`}>
                  <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                    {category.categoryName}
                  </p>
                </Link>

                <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
                  Due Today
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
