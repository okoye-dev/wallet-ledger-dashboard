import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

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
      <body className={publicSans.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
