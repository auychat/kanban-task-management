import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { BoardProvider } from "@/context/BoardContext";

// const inter = Inter({ subsets: ["latin"] });
const PlusJakartaSans = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Task Management Web Application",
  description: "Created by CHR Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="any" />
      </head>
      <ThemeProvider>
        <body className={PlusJakartaSans.className}>
          <BoardProvider>{children}</BoardProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
