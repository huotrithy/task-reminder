"use client";

import { EllipsisVertical, Pencil, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { DeleteModal } from "./delete-modal";
import { ErrorResponse, SuccessResponse } from "@/lib/types/type";

interface Props {
  deleteTitle: string;
  onDelete: () => Promise<SuccessResponse<unknown> | ErrorResponse<unknown>>;
  deleteSuccessRedirectUrl?: string;
  updateUrl: string;
}

export default function DetailButtonMenu({
  updateUrl,
  deleteTitle,
  deleteSuccessRedirectUrl,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 z-50">
      <div className="flex flex-col items-end gap-4">
        {open && (
          <>
            <Button variant="outline" size="lg">
              <Link href={updateUrl} className="flex items-center gap-2">
                <Pencil /> Update
              </Link>
            </Button>

            <DeleteModal
              title={deleteTitle}
              onDelete={onDelete}
              successRedirectUrl={deleteSuccessRedirectUrl}
            />
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
