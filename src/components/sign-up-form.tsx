"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/services/auth-service";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupFormInputs, signupSchema } from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formInput: SignupFormInputs) => {
      const response = await signup(formInput);

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || "Signup failed.");
      }
    },
    onSuccess: () => {
      toast.success("Signup success");
      form.reset();
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(`${error.message}`);
    },
  });

  async function handleSubmit(data: SignupFormInputs) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-6 flex flex-col"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Task Reminder.</span>
              </Link>
              <h1 className="text-xl font-bold">Welcome to Task Reminder.</h1>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button variant="link" className="p-1">
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl className="mt-0.5">
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="mt-0.5">
                        <Input
                          placeholder="***"
                          type="password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl className="mt-0.5">
                        <Input
                          placeholder="***"
                          type="password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                {mutation.isPending ? "Signing up..." : "Signup"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
}
