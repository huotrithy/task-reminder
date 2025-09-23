import { Task } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDateToString } from "../utils";

interface Props {
  tasks?: Task[];
}

export function TaskList({ tasks }: Props) {
  return (
    <ul className="space-y-3 pt-4">
      {tasks &&
        tasks.map((task) => (
          <Link
            key={task.id}
            href={`/app/task/${task.id}`}
            className="block group"
          >
            <li className="rounded-xl border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50 hover:shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 group-hover:text-gray-900">
                  {task.taskName}
                </span>
                <Badge
                  variant="secondary"
                  className={`py-0.5 text-xs font-medium transition ${
                    task.isToSend
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {task.isToSend ? "Notification On" : "Notification Off"}
                </Badge>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Deadline: {formatDateToString(task.deadline)}
              </p>

              {task.desc && (
                <p className="mt-2 text-sm text-gray-600 lg:line-clamp-2 line-clamp-3">
                  {task.desc}
                </p>
              )}
            </li>
          </Link>
        ))}
    </ul>
  );
}
