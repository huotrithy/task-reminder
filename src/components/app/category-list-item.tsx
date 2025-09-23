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
      className="rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 py-3 px-5 cursor-pointer">
          <div className="flex flex-col">
            <Link href={`/app/category/${category.id}`} className="flex-grow">
              <p className="text-base font-semibold leading-6 text-gray-900 line-clamp-1">
                {category.categoryName}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {category.task.length} tasks under this category
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
                <li className="rounded-xl border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {task.taskName}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "py-0.5 text-xs font-medium transition",
                        task.isToSend
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {task.isToSend ? "Notification On" : "Notification Off"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Deadline: {formatDateToString(task.deadline)}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic pt-3">
            No tasks in this category yet.
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
