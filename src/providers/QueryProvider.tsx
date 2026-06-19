"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // প্রজেক্টে ক্যাশ কনফিগারেশন সেট করা
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 3, // ৩ মিনিট পর্যন্ত ডাটা ক্যাশে তাজা (Fresh) থাকবে, বারবার ফেচ হবে না
            refetchOnWindowFocus: false, // ব্রাউজার ট্যাব চেঞ্জ করলে বারবার রি-ফেচ বন্ধ রাখবে
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}