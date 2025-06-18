"use client";

import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";

interface Props {
  categoryId: string;
}

export default function DetailButtonMenu({ categoryId }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute bottom-4 right-4 z-50">
      <div className="flex flex-col items-end gap-4">
        {open && (
          <>
            <Button variant="outline" size="lg">
              <Link
                href={`/app/category/update/${categoryId}`}
                className="flex items-center gap-2"
              >
                <Pencil /> Update
              </Link>
            </Button>

            <Button variant="outline" size="lg">
              <Trash2 />
              Delete
            </Button>
          </>
        )}

        <Button
          variant="default"
          size="lg"
          className="bg-gray-900 text-gray-50 w-fit hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open === true ? (
            <X className="h-6 w-6" />
          ) : (
            <EllipsisVertical className="h-6 w-6" />
          )}
          <span className="sr-only">Detail</span>
        </Button>
      </div>
    </div>
  );
}
