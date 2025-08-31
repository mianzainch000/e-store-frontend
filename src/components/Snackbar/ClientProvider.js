"use client";
import { SnackbarProvider } from "@/components/Snackbar";

export default function ClientProvider({ children }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
