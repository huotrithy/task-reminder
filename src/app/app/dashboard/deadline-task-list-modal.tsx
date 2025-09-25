import { TaskList } from "@/components/category/task-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskProps } from "@/shared/types/task-props";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  tasks?: TaskProps[];
};

export function DeadlineTaskListModal(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72">
          <TaskList tasks={props.tasks} />
        </ScrollArea>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
