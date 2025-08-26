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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://carleton-resume.vercel.app',
    title: 'Carleton Cabarrus | Full-Stack Software Developer',
    description: 'Experienced Full-Stack Developer specializing in enterprise solutions with .NET, Java, and cloud technologies.',
    siteName: 'Carleton Cabarrus Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Carleton Cabarrus - Full-Stack Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carleton Cabarrus | Full-Stack Software Developer',
    description: 'Experienced Full-Stack Developer specializing in enterprise solutions with .NET, Java, and cloud technologies.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://carleton-resume.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Carleton Cabarrus",
              "jobTitle": "Full-Stack Software Developer",
              "url": "https://carleton-resume.vercel.app",
              "sameAs": [
                "https://www.linkedin.com/in/carleton-cabarrus-jr/",
                "https://github.com/carletoncabarrus"
              ],
              "email": "carletoncabarrus@gmail.com",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Virginia Commonwealth University"
              },
              "knowsAbout": [
                "Full-Stack Development",
                ".NET Development",
                "Java Development",
                "Cloud Architecture",
                "Microsoft Azure",
                "AWS",
                "Microservices",
                "Enterprise Software",
                "Clean Architecture"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        {/* Performance monitoring script placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add your analytics script here (Google Analytics, etc.)
              // console.log('Page loaded');
            `
          }}
        />
      </body>
    </html>
  );
}