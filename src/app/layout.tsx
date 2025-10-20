import type { Metadata } from "next";
import { M_PLUS_1p, Inter } from "next/font/google";
import "./globals.css";

const Mplus1p = M_PLUS_1p({
  variable: "--font-mplus-1p",
  weight: ["400", "700"],
  subsets: ["latin"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`
        ${Mplus1p.variable} ${inter.variable}
        antialiased
      `}>
        {children}
      </body>
    </html>
  );
}
