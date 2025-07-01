"use client";

import { SessionProvider } from "next-auth/react";
import {
  DehydratedState,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export default function AppProvider({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
