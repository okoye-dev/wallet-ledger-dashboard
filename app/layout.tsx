import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Wallet Ledger",
  description: "Developed by The17thSTudio Wallet Ledger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
