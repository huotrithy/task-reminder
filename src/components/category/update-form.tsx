"use client";

import {
  UpdateCategoryInputs,
  updateCategorySchema,
} from "@/lib/schemas/category-schema";
import { updateCategory } from "@/lib/services/category-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

export function UpdateCategoryForm(initialData: Category) {
  const router = useRouter();

  const form = useForm<UpdateCategoryInputs>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      categoryName: initialData.categoryName,
      categoryId: initialData.id,
    },
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
      toast.success("Category created successfully!");
      form.reset();
      router.push("/app");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const onInvalid = (errors: unknown) => console.error(errors);

  const handleSubmit = (data: UpdateCategoryInputs) => {
    mutation.mutate(data);
  };

  return (
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

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? "Submitting..." : "Update Category"}
        </Button>
      </form>
    </Form>
  );
}
