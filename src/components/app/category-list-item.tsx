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
      className="shadow-md overflow-hidden"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 py-2 px-4 inset-ring-2 inset-ring-gray-100 cursor-pointer">
          <div className="flex flex-col justify-center">
            <Link href={`/app/category/${category.id}`} className="flex-grow">
              <p className="text-lg font-medium leading-6 line-clamp-1">
                {category.categoryName}
              </p>

              <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
                {category.task.length} Tasks
              </p>
            </Link>
          </div>

          <ChevronLeft
            className={cn("w-6 h-6 duration-100", {
              "-rotate-90": openList === true,
            })}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 pb-2">
        {category.task.length > 0 ? (
          <ul className="space-y-2 pt-2">
            {category.task.map((task, index) => (
              <Link key={index} href={`/app/task/${task.id}`} className="block">
                <li className="p-2 border rounded-md bg-gray-50 flex flex-col gap-1">
                  <div className="flex justify-between">
                    {task.taskName}
                    {task.isToSend === true ? (
                      <Badge variant="secondary" className="py-1 bg-blue-100">
                        Notification On
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="py-1">
                        Notification Off
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm leading-none font-medium">
                    Deadline: {formatDateToString(task.deadline)}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic pt-2">
            No tasks in this category yet.
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
