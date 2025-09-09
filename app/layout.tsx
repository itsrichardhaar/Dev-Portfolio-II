import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";  
import CursorGlow from "@/components/CursorGlow";

// Configure the font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#10b981" }],
  },
  title: "Richard H — Portfolio",
  description: "Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel. All text is set in the Inter typeface.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Classic ICO (fallback) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* SVG (crisp at any size; great in dark mode if designed for it) */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* PNG (specific size) */}
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192" />
        {/* Apple touch icon (homescreen) */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        {/* Safari pinned tab (monochrome) */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#10b981" />
      </head>
      <body className="font-sans bg-[#101522] text-[rgb(148,163,184)] antialiased">
        <CursorGlow />   {/* <- here */}
        {children}
      </body>
    </html>
  );
}
