import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pratyush Landekar | AI Systems Engineer & Quantitative Analyst",
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
    title: "Pratyush Landekar | AI Systems Engineer",
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
    "jobTitle": "AI Systems Engineer",
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
      <body className="bg-primary text-slate-100 font-sans antialiased selection:bg-cyanAccent selection:text-primary">
        {children}
      </body>
    </html>
  );
}
