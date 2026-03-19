"use client";

import { ThemeProvider } from "@/context/theme-context";
import { ToastProvider } from "@/context/toast-context";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
