"use client";

import { EllipsisVertical, Pencil, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { DeleteModal } from "./delete-modal";
import { ServerResponse } from "@/shared/types/type";

interface Props {
  deleteTitle: string;
  onDelete: () => Promise<ServerResponse>;
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
          className="bg-primary text-primary-foreground w-fit hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-primary dark:text-primary-foreground dark:hover:bg-secondary dark:hover:text-secondary-foreground dark:focus-visible:ring-ring"
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
