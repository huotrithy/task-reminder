"use client";

import { Grid2x2Plus, LayoutList, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function FloatButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute bottom-4 right-4 z-50">
      <div className="flex flex-col items-end gap-4">
        {open && (
          <>
            <Button variant="outline" size="lg">
              <Link
                href="/app/category/add"
                className="flex items-center gap-2"
              >
                <Grid2x2Plus /> Category
              </Link>
            </Button>

            <Button variant="outline" size="lg">
              <LayoutList /> Task
            </Button>
          </>
        )}

        <Button
          variant="default"
          size="lg"
          className="bg-gray-900 text-gray-50 w-fit hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          onClick={() => setOpen(!open)}
        >
          <PlusIcon
            className={cn("h-6 w-6 duration-100", {
              "rotate-45": open === true,
            })}
          />
          <span className="sr-only">Add</span>
        </Button>
      </div>
    </div>
  );
}
