"use client";

import { Toastr } from "@/components/Toast/Toast";
import { QueryProvider } from "@/libs/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toastr />
    </QueryProvider>
  );
}
