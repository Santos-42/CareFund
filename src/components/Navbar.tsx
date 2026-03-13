import Link from 'next/link';
import { Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Heart className="text-white dark:text-slate-950 w-6 h-6 fill-current" />
            </div>
            <Link href="/">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">CareFund</span>
            </Link>
          </div>
          
          <div className="flex space-x-4 items-center">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-teal-50 dark:bg-brand-navy/30 border border-teal-200 dark:border-teal-500/30 rounded-full transition-colors">
               <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
               <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">Live on Mayar Sandbox</span>
            </div>
            <a 
              href="mailto:riosantosomksj@gmail.com?subject=Kerjasama%20Memulai%20Campaign%20Baru" 
              className="px-5 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold rounded-lg transition-colors text-sm"
            >
              Mulai Campaign
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
