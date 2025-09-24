import { Task } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDateToString } from "../utils";
import { ClipboardList } from "lucide-react";

interface Props {
  tasks?: Task[];
}

export function TaskList({ tasks }: Props) {
  const hasTasks = tasks && tasks.length > 0;

  return (
    <div className="pt-4">
      {!hasTasks && (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <ClipboardList className="h-8 w-8 mb-2 text-gray-400" />
          <p className="text-sm font-medium">No tasks found</p>
          <p className="text-xs text-gray-400">
            Create a new task to get started.
          </p>
        </div>
      )}

      {hasTasks && (
        <ul className="space-y-3">
          {tasks!.map((task) => (
            <Link
              key={task.id}
              href={`/app/task/${task.id}`}
              className="block group"
            >
              <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 group-hover:text-primary">
                    {task.taskName}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`py-1 px-2 text-xs font-medium rounded-full transition-colors ${
                      task.isToSend
                        ? "bg-primary text-white"
                        : "bg-muted text-gray-500"
                    }`}
                  >
                    {task.isToSend ? "Notification On" : "Notification Off"}
                  </Badge>
                </div>

                {task.deadline && (
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-medium">Deadline:</span>{" "}
                    {formatDateToString(task.deadline)}
                  </p>
                )}

                {task.desc && (
                  <p className="mt-2 text-sm text-gray-600 lg:line-clamp-2 line-clamp-3">
                    {task.desc}
                  </p>
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
