"use client";

import { Button } from "@/components/ui/button";
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
import {
  upsertTelegramChatIDInputs,
  upsertTelegramChatIDSchema,
} from "@/lib/schemas/user-schema";
import { upSertTelegramChatID } from "@/lib/services/user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  name: string;
  email: string;
  telegram_chat_id?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function PageClient({ telegram_chat_id }: Props) {
  const router = useRouter();
  const [openTelegramConnect, setOpenTelegramConnect] = useState(false);

  const form = useForm<upsertTelegramChatIDInputs>({
    resolver: zodResolver(upsertTelegramChatIDSchema),
    defaultValues: telegram_chat_id
      ? {
          telegram_chat_id: telegram_chat_id,
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

  return (
    <div>
      <Collapsible
        open={openTelegramConnect}
        onOpenChange={setOpenTelegramConnect}
        className="overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="scroll-m-20 mt-2 md:text-lg text-base font-medium tracking-tight">
              Telegram Integration
            </h5>
            <p className="mt-1 md:text-base text-sm">
              Connect your telegram account for reminder
            </p>
          </div>
          <CollapsibleTrigger asChild>
            {openTelegramConnect ? (
              <Button variant="secondary">Cancel</Button>
            ) : (
              <Button asChild>
                <Link
                  href="https://t.me/reminder_autobot_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {telegram_chat_id ? "Reconnect" : "Connect"}
                </Link>
              </Button>
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="shadow-md border-2 p-2 mt-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6  mt-2 flex flex-col"
            >
              <FormField
                control={form.control}
                name="telegram_chat_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input
                        className="md:text-base text-sm"
                        placeholder="Enter the chat id you received from the bot"
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
                className="self-end mt-0"
              >
                {mutation.isPending ? "Submitting..." : "Save"}
              </Button>
            </form>
          </Form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
