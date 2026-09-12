import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const headingFont = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"], // Pin to standard settings if possible, or just default axes
  variable: "--font-heading",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pratyush Landekar | Portfolio",
  description: "Portfolio of Pratyush Landekar — MBA Tech dual-degree candidate at MPSTME, NMIMS Mumbai. Specializing in multi-agent AI swarms, enterprise data automation pipelines, and high-performance full-stack architectures.",
  keywords: [
    "Pratyush Landekar",
    "AI Systems Engineer",
    "Multi-Agent Swarms",
    "LangGraph",
    "LangChain",
    "FastAPI",
    "Next.js",
    "NMIMS MPSTME",
    "Supply Chain Analytics",
    "Quantitative Finance"
  ],
  authors: [{ name: "Pratyush Landekar", url: "https://github.com/pratyush103" }],
  openGraph: {
    title: "Pratyush Landekar | Portfolio & Systems Engineer",
    description: "Building multi-agent AI systems, enterprise workflow automations, and scalable full-stack web applications.",
    url: "https://github.com/pratyush103",
    siteName: "Pratyush Landekar Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratyush Landekar",
    description: "Multi-Agent AI Swarms, Enterprise Automation, and Full-Stack Engineering.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pratyush Landekar",
    "jobTitle": "Engineer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Mukesh Patel School of Technology Management & Engineering (NMIMS)"
    },
    "sameAs": [
      "https://github.com/pratyush103",
      "https://www.linkedin.com/in/pratyush-landekar103"
    ],
    "knowsAbout": [
      "Multi-Agent AI Frameworks",
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Next.js",
      "Supply Chain Analytics",
      "Quantitative Finance"
    ]
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-primary text-textMain font-sans antialiased selection:bg-cyanAccent selection:text-primary">
        {children}
      </body>
    </html>
  );
}
