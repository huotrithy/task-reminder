"use client";

import { Grid2x2Plus, LayoutList, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/client-utils";

type Props = {
  setOpenCreateCategoryForm: Dispatch<SetStateAction<boolean>>;
  setOpenCreateTaskForm: Dispatch<SetStateAction<boolean>>;
};

export default function AddButtonMenu(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
        <div className="flex flex-col items-end gap-4">
          {open && (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  props.setOpenCreateCategoryForm(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <Grid2x2Plus /> Category
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  props.setOpenCreateTaskForm(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <LayoutList /> Task
                </div>
              </Button>
            </>
          )}

          <Button
            variant="default"
            size="lg"
            className="bg-primary text-primary-foreground w-fit hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-primary dark:text-primary-foreground dark:hover:bg-secondary dark:hover:text-secondary-foreground dark:focus-visible:ring-ring"
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
    </>
  );
}
