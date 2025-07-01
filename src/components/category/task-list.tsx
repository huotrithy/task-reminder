import { Task } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDateToString } from "../utils";

interface Props {
  tasks?: Task[];
}

export function TaskList({ tasks }: Props) {
  return (
    <ul className="space-y-2 pt-2">
      {tasks &&
        tasks.map((task, index) => (
          <Link key={index} href={`/app/task/${task.id}`} className="block">
            <li className="p-2 border rounded-md bg-gray-50 flex flex-col gap-1 shadow-md">
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
              {task.desc && (
                <p className="mt-1 text-sm/8 text-pretty lg:line-clamp-2 line-clamp-3 leading-none font-medium">
                  {task.desc}
                </p>
              )}
            </li>
          </Link>
        ))}
    </ul>
  );
}
