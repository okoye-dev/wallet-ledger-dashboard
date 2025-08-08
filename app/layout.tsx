import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { ReactQueryProvider } from "@/lib/react-query";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "FinTrack - Personal Wallet Ledger",
  description:
    "Track your wallet, manage budgets, and achieve your financial goals with FinTrack. Personal finance management made simple.",
  openGraph: {
    title: "FinTrack - Personal Wallet Ledger",
    description:
      "Track your wallet, manage budgets, and achieve your financial goals with FinTrack. Personal finance management made simple.",
    type: "website",
    url: "https://wallet-ledger-ten.vercel.app",
    siteName: "FinTrack Wallet",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "FinTrack - Personal Wallet Ledger",
      },
    ],
  },
  keywords: [
    "personal finance",
    "expense tracking",
    "budget management",
    "financial planning",
    "money management",
    "FinTrack",
  ],
  authors: [{ name: "The17thStudio" }],
  creator: "The17thStudio",
  publisher: "The17thStudio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={publicSans.className}>
        <ReactQueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
