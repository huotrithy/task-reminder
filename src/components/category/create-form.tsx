"use client";

import {
  CreateCategoryInputs,
  createCategorySchema,
} from "@/lib/schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { createCategory } from "@/lib/services/category-service";
import { toast } from "sonner";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  refect: () => Promise<QueryObserverResult>;
};

export function CreateCategoryForm(props: Props) {
  const form = useForm<CreateCategoryInputs>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formInput: CreateCategoryInputs) => {
      const response = await createCategory(formInput);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message);
    },
    onSuccess: () => {
      toast.success("Category created successfully!");
      props.setOpen(false);
      props.refect();
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmit = (data: CreateCategoryInputs) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Submitting..." : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
