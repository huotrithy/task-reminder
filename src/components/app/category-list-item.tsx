import { cn } from "@/lib/utils";
import { Category, Task } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { formatDateToString } from "../utils";
import { Badge } from "../ui/badge";

interface Prop {
  category: Category & { task: Task[] };
}

export function CategoryListItem({ category }: Prop) {
  const [openList, setOpenList] = useState(false);

  return (
    <Collapsible
      open={openList}
      onOpenChange={setOpenList}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 py-4 px-5 cursor-pointer">
          <div className="flex flex-col">
            <Link href={`/app/category/${category.id}`} className="flex-grow">
              <p className="text-base font-semibold leading-6 text-gray-900 group-hover:text-primary line-clamp-1">
                {category.categoryName}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {category.task.length}{" "}
                {category.task.length === 1 ? "task" : "tasks"} under this
                category
              </p>
            </Link>
          </div>

          <ChevronLeft
            className={cn(
              "w-5 h-5 text-gray-500 transition-transform duration-200",
              { "-rotate-90": openList }
            )}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-5 pb-4">
        {category.task.length > 0 ? (
          <ul className="space-y-3 pt-3">
            {category.task.map((task) => (
              <Link
                key={task.id}
                href={`/app/task/${task.id}`}
                className="block group"
              >
                <li className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800 group-hover:text-primary">
                      {task.taskName}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "py-1 px-2 text-xs font-medium rounded-full transition-colors",
                        task.isToSend
                          ? "bg-primary text-white"
                          : "bg-muted text-gray-500"
                      )}
                    >
                      {task.isToSend ? "Notification On" : "Notification Off"}
                    </Badge>
                  </div>
                  {task.deadline && (
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="font-medium">Deadline:</span>{" "}
                      {formatDateToString(task.deadline)}
                    </p>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="pt-3 text-center text-gray-400">
            <p className="text-sm italic">No tasks in this category yet.</p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
