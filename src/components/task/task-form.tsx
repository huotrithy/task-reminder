"use client";

import { UpsertTaskInputs, upsertTaskSchema } from "@/lib/schemas/task-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/client-utils";
import { Task } from "@prisma/client";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

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

  const defaultValues = useMemo(() => {
    return props.task
      ? {
          taskName: props.task.taskName,
          desc: props.task.desc,
          deadline: props.task.deadline,
          isToSend: props.task.isToSend,
          categoryId: props.task.categoryId,
          reminderPeriodDay: props.task.reminderPeriodDay,
          reminderDeadline: props.task.reminderDeadline,
        }
      : {
          taskName: "",
          desc: "",
          deadline: null,
          isToSend: true,
          categoryId: "",
          reminderPeriodDay: 30,
          reminderDeadline: new Date(),
        };
  }, [props.task]);

  const form = useForm<UpsertTaskInputs>({
    resolver: zodResolver(upsertTaskSchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (formInput: UpsertTaskInputs) => {
      if (formInput.isToSend === false) {
        formInput.reminderPeriodDay = null;
        formInput.reminderDeadline = null;
      }

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

  const isToSend = form.watch("isToSend");

  useEffect(() => {
    if (props.open) {
      form.reset(defaultValues);
    }
  }, [props.open, defaultValues, form]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.task
              ? `Update Task - ${props.task.taskName}`
              : "Add new Task"}
          </DialogTitle>
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
                    <Input
                      placeholder="Enter Task name"
                      className="text-sm"
                      {...field}
                    />
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
                    <FormControl className="w-full text-sm">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for this task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm">
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
                      className="text-sm"
                      placeholder="Enter Task description (Optional)"
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
                            <span>Pick your deadline</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
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
            {isToSend && (
              <>
                <FormField
                  name="reminderDeadline"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Reminder Deadline</FormLabel>
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
                                <span>Pick your reminder deadline</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                            startMonth={new Date(2000, 0)}
                            endMonth={new Date(2100, 0)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Set the date you want to be notified to complete the
                        task. This is not the final due date.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reminderPeriodDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Period</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Reminder period in days"
                          className="text-sm"
                          {...field}
                          value={field.value ?? undefined}
                          {...form.register("reminderPeriodDay", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the number of days you want to receive a daily
                        notification before the Reminder Deadline
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? "Submitting..."
                  : props.task
                  ? "Update"
                  : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
