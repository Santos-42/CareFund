import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const publicSans = Public_Sans({
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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${publicSans.variable} font-sans antialiased bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100 transition-colors duration-300 flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12 px-4 md:px-10 lg:px-40 mt-auto transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col gap-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-2">
                  <span className="material-symbols-outlined text-2xl font-bold" style={{fontVariationSettings: "'FILL' 1"}}>volunteer_activism</span>
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold">CareFund</h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                  Platform donasi berbasis transparansi untuk masa depan filantropi Indonesia yang lebih baik.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-4">
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium text-center md:text-right">
                  © 2026 CareFund. Dibangun untuk Vibecoding Competition Mayar 2026.
                </p>
                <a 
                  href="https://github.com/Santos-42/CareFund" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  Source Code 
                </a>
              </div>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
