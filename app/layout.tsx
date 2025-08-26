import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carleton Cabarrus | Full-Stack Software Developer",
  description: "Experienced Full-Stack Developer specializing in .NET, Java, cloud architecture, and enterprise solutions. 5+ years building scalable applications with 99.9% uptime.",
  keywords: "Carleton Cabarrus, Full Stack Developer, Software Engineer, .NET Developer, Java Developer, Cloud Architect, Azure, AWS, Blazor, React, Virginia",
  authors: [{ name: "Carleton Cabarrus" }],
  creator: "Carleton Cabarrus",
  publisher: "Carleton Cabarrus",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Carleton Cabarrus | Full-Stack Software Developer',
    description: 'Experienced Full-Stack Developer specializing in enterprise solutions with .NET, Java, and cloud technologies.',
    siteName: 'Carleton Cabarrus Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}