import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareFund",
  description: "Portal Donasi Transparan. Bantu sesama dengan keterbukaan data riel-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 mt-auto transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
              © 2026 CareFund. Dibangun untuk Vibecoding Competition Mayar 2026.
            </p>
            <a 
              href="https://github.com/RioS21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-500 hover:text-teal-500 dark:hover:text-teal-400 text-sm font-medium transition-colors"
            >
              Lihat Source Code di GitHub
            </a>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
