// components/ThemeProvider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"          // ← "data-theme" পরিবর্তন করে "class" করুন
      defaultTheme="dark"
      enableSystem={false}       
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}