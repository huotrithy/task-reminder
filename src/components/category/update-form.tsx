"use client";

import {
  UpdateCategoryInputs,
  updateCategorySchema,
} from "@/lib/schemas/category-schema";
import { updateCategory } from "@/lib/services/category-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Category } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

type Props = {
  initialData: Category;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult>;
};

export function UpdateCategoryForm(props: Props) {
  const defaultValues = useMemo(
    () => ({
      categoryName: props.initialData.categoryName,
      categoryId: props.initialData.id,
    }),
    [props.initialData]
  );

  const form = useForm<UpdateCategoryInputs>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (formInput: UpdateCategoryInputs) => {
      const response = await updateCategory(formInput);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message);
    },
    onSuccess: () => {
      toast.success("Category updated successfully!");
      props.setOpen(false);
      props.refetch();
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const onInvalid = (errors: unknown) => console.error(errors);

  const handleSubmit = (data: UpdateCategoryInputs) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (props.open) {
      form.reset(defaultValues);
    }
  }, [props.open, defaultValues, form]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, onInvalid)}
            className="space-y-8 mt-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl className="mt-0.5">
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormLabel>Category Id</FormLabel>
                  <FormControl className="mt-0.5">
                    <Input placeholder="Category ID" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Update..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
