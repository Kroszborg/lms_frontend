import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduLMS - Learning Management System",
  description:
    "A comprehensive learning management system for educators and students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use usePathname to determine the current route
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const hideNavbar = pathname.startsWith("/login");
  const hideFooter = pathname.startsWith("/login");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {!hideNavbar && <Navbar />}
            {children}
            {!hideFooter && <Footer />}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
