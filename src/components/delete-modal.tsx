import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ErrorResponse, SuccessResponse } from "@/lib/types/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  onDelete: () => Promise<SuccessResponse<unknown> | ErrorResponse<unknown>>;
  successRedirectUrl: string;
}

export function DeleteModal({ onDelete, title, successRedirectUrl }: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await onDelete();
      if (response.success) {
        return response;
      }
      throw new Error(response.message);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Delete successfully!");
      setOpen(false);
      router.push(successRedirectUrl);
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="lg">
            <Trash2 />
            Delete
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>Are you sure?</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Delete..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
