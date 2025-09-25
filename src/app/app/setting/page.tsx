"use client";

import { getUser, upSertTelegramChatID } from "@/lib/services/user-service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  upsertTelegramChatIDInputs,
  upsertTelegramChatIDSchema,
} from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/page-header/page-header";
import MainContentWrapper from "@/components/main-content-wrapper";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting"],
    queryFn: async () => {
      const response = await getUser();
      if (response.success) return response.data;
      throw new Error(response.message || "An error has occured.");
    },
  });

  const router = useRouter();
  const [openTelegramConnect, setOpenTelegramConnect] = useState(false);
  const session = useSession();

  const form = useForm<upsertTelegramChatIDInputs>({
    resolver: zodResolver(upsertTelegramChatIDSchema),
    defaultValues: {
      telegram_chat_id: data?.user.telegram_chat_id ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formInput: upsertTelegramChatIDInputs) => {
      const response = await upSertTelegramChatID(formInput);
      if (response.success) return response.data;
      throw new Error(response.message);
    },
    onSuccess: () => {
      toast.success(`Telegram connected successfully!`);
      form.reset();
      setOpenTelegramConnect(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmit = (data: upsertTelegramChatIDInputs) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading Data...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <PageHeader title="Settings" desc="Manage your preferences and account" />

      <MainContentWrapper>
        <div className="space-y-6">
          {/* Telegram Integration */}
          <Collapsible
            open={openTelegramConnect}
            onOpenChange={setOpenTelegramConnect}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 transition hover:shadow-md"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h5 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Telegram Integration
                </h5>
                <p className="mt-1 text-sm text-gray-600">
                  Connect your Telegram account to receive reminders.
                </p>
              </div>

              <CollapsibleTrigger asChild>
                {openTelegramConnect ? (
                  <Button
                    variant="outline"
                    className="text-sm md:text-base min-w-[120px]"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="text-sm md:text-base min-w-[120px]"
                  >
                    <Link
                      href="https://t.me/reminder_autobot_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.user.telegram_chat_id ? "Reconnect" : "Connect"}
                    </Link>
                  </Button>
                )}
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-5 shadow-inner">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="telegram_chat_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm md:text-base font-medium text-gray-800">
                          Telegram Chat ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="md:text-base text-sm"
                            placeholder="Enter the chat ID you received from the bot"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="md:text-base px-6"
                    >
                      {mutation.isPending ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CollapsibleContent>
          </Collapsible>

          {/* Account Settings */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 transition hover:shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h5 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Account
                </h5>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your account settings.
                </p>
              </div>
              {session.status === "authenticated" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    signOut({ redirect: true, callbackUrl: "/login" })
                  }
                  className="text-sm md:text-base min-w-[120px]"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </>
  );
}
