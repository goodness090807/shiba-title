"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// 建立 QueryClient 實例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 預設快取時間
      staleTime: 5 * 60 * 1000, // 5 分鐘
      gcTime: 10 * 60 * 1000, // 10 分鐘

      // 重試設定
      retry: (failureCount, error) => {
        // 401/403 錯誤不重試
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { status?: number } };
          if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
            return false;
          }
        }
        return failureCount < 3;
      },

      // 背景重新取得設定
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      // Mutation 重試設定
      retry: (failureCount, error) => {
        // 400-499 錯誤不重試
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { status?: number } };
          const status = axiosError.response?.status;
          if (status && status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 1;
      },
    },
  },
});

interface QueryProviderProps {
  readonly children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// 導出 queryClient 以便在其他地方使用
export { queryClient };
