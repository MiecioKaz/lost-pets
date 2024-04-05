import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import Navbar from "@/components/navbar";
import { NextAuthProvider } from "../utils/providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
