import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";  

// Configure the font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata = {
  title: "Richard H — Portfolio",
  description: "Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel. All text is set in the Inter typeface.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-[#101522] text-neutral-200 antialiased">
        {children}
      </body>
    </html>
  );
}
