"use client";

import { UpsertTaskInputs, upsertTaskSchema } from "@/lib/schemas/task-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  QueryObserverResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { createTask, updateTask } from "@/lib/services/task-service";
import { toast } from "sonner";
import { getCategories } from "@/lib/services/category-service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface TaskFormProps {
  task?: Task;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch?: () => Promise<QueryObserverResult>;
}

export function TaskForm(props: TaskFormProps) {
  const { data: categories } = useQuery({
    queryKey: ["categoriesInput"],
    queryFn: async () => {
      const response = await getCategories();

      if (response.success) {
        return response.data.categories;
      }

      throw new Error(response.message || "An error has occured.");
    },
  });

  const form = useForm<UpsertTaskInputs>({
    resolver: zodResolver(upsertTaskSchema),
    defaultValues: props.task
      ? {
          taskName: props.task.taskName,
          desc: props.task.desc,
          deadline: props.task.deadline,
          isToSend: props.task.isToSend,
          categoryId: props.task.categoryId,
        }
      : {
          taskName: "",
          desc: "",
          deadline: new Date(),
          isToSend: true,
          categoryId: "",
        },
  });

  const mutation = useMutation({
    mutationFn: async (formInput: UpsertTaskInputs) => {
      let response;
      if (props.task) {
        response = await updateTask(formInput, props.task.id);
      } else {
        response = await createTask(formInput);
      }

      if (response.success) {
        return response.data;
      }
      throw new Error(response.message);
    },
    onSuccess: () => {
      toast.success(`Task ${props.task ? "updated" : "created"} successfully!`);
      props.setOpen(false);
      if (props.refetch) {
        props.refetch();
      }
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmit = (data: UpsertTaskInputs) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="taskName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Task name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for this task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories &&
                        categories.map((category, index) => {
                          return (
                            <SelectItem value={category.id} key={index}>
                              {category.categoryName}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Task description"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-1/2 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        startMonth={new Date(2000, 0)}
                        endMonth={new Date(2100, 0)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="isToSend"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="h-5 w-5"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Send Notification</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? "Submitting..."
                  : props.task
                  ? "Update Task"
                  : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
