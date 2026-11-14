import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { NotificationProvider } from "@/components/notifications/notification-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstateHub | Property Management",
  description: "A clear view of your property portfolio. EstateHub property management foundation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider><AppShell>{children}</AppShell></NotificationProvider>
      </body>
    </html>
  );
}
