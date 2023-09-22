import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });
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
      <ThemeProvider>
        <body className={PlusJakartaSans.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
