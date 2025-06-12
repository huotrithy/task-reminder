"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/services/auth-service";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await signup(formData);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || "Signup failed.");
      }
    },
    onSuccess: (data) => {
      alert(`Account created successfully! ${data}`);
    },
    onError: (error: Error) => {
      console.log(error);
      alert(`Signup failed: ${error.message}`);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="***"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="***"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {mutation.isPending ? "Signing up..." : "Signup"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
