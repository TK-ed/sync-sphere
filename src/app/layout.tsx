import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SyncSphere",
  description:
    "A simple and efficient website for storing and syncing files. SyncSphere makes it easy to manage your files and access them from anywhere.",
  authors: [{ name: "TK-ed", url: "https://tk-ed.vercel.app" }],
  metadataBase: new URL("https://next-sync.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://next-sync.vercel.app",
    title: "Sync.Sphere",
    description:
      "A simple and efficient website for storing and syncing files. SyncSphere makes it easy to manage your files and access them from anywhere.",
    siteName: "Sync.Sphere",
    images: "/SyncSphere.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/logo_head.png" sizes="any" />
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Analytics />
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
