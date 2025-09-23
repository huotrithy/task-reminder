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

export default function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting"],
    queryFn: async () => {
      const response = await getUser();
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || "An error has occured.");
    },
  });

  const router = useRouter();
  const [openTelegramConnect, setOpenTelegramConnect] = useState(false);

  const form = useForm<upsertTelegramChatIDInputs>({
    resolver: zodResolver(upsertTelegramChatIDSchema),
    defaultValues: data?.user.telegram_chat_id
      ? {
          telegram_chat_id: data.user.telegram_chat_id,
        }
      : {
          telegram_chat_id: "",
        },
  });

  const mutation = useMutation({
    mutationFn: async (formInput: upsertTelegramChatIDInputs) => {
      const response = await upSertTelegramChatID(formInput);
      if (response.success) {
        return response.data;
      }
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
      <PageHeader title="Setting" desc="Configure your setting" />

      <MainContentWrapper>
        <div>
          <Collapsible
            open={openTelegramConnect}
            onOpenChange={setOpenTelegramConnect}
            className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 transition hover:shadow-md"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h5 className="text-base md:text-lg font-semibold text-gray-900 tracking-tight">
                  Telegram Integration
                </h5>
                <p className="mt-1 text-sm md:text-base text-gray-500">
                  Connect your Telegram account to get reminders.
                </p>
              </div>

              <CollapsibleTrigger asChild>
                {openTelegramConnect ? (
                  <Button variant="outline" className="text-sm md:text-base">
                    Cancel
                  </Button>
                ) : (
                  <Button asChild className="text-sm md:text-base">
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

            <CollapsibleContent className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-inner">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 mt-2 flex flex-col"
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
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="self-end mt-0 md:text-base"
                  >
                    {mutation.isPending ? "Submitting..." : "Save"}
                  </Button>
                </form>
              </Form>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </MainContentWrapper>
    </>
  );
}
