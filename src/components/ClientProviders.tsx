"use client";

import { ReactNode, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutProvider from "@/contexts/layout";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <Suspense>{children}</Suspense>
      </LayoutProvider>
    </QueryClientProvider>
  );
}
