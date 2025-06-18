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

export function UpdateCategoryForm() {
  const router = useRouter();

  const form = useForm<UpdateCategoryInputs>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      categoryName: "",
      categoryId: "",
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

  const handleSubmit = (data: UpdateCategoryInputs) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 mt-4 flex flex-col"
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

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="self-end"
        >
          {mutation.isPending ? "Submitting..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
