import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
title: "Richard H - Portfolio",
description: "Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel. All text is set in the Inter typeface.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en" className="scroll-smooth">
<body className="bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-200">
{children}
</body>
</html>
)}
