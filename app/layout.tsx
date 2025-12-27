import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MatrixBackground from "@/components/MatrixBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CodeLearn - Interactive Programming Education",
  description: "Learn web development through interactive tutorials, live code editing, and hands-on projects. From HTML basics to advanced React applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <MatrixBackground />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
