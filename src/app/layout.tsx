import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { assertAuthBypassNotInProduction } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://support-ai-nine-mu.vercel.app";
const seoTitle = "OpsConcierge — AI Ops Desk (Support + Hiring)";
const seoDescription =
  "AI ops desk for small businesses: widget FAQ deflection, tickets with full chat, execution logs, and resume shortlisting with why / why-not evidence.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OpsConcierge | AI Concierge for Business Operations",
  description: seoDescription,
  applicationName: "OpsConcierge",
  robots: { index: true, follow: true },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteUrl,
    siteName: "OpsConcierge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  assertAuthBypassNotInProduction();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <ThemeScript />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
