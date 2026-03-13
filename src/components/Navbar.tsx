import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-12">
              <Image src="/logo.png" alt="CareFund Logo" fill className="object-contain" />
            </div>
            <Link href="/">
              <span className="text-2xl font-bold text-white tracking-tight">CareFund</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-teal-400 font-medium hover:text-teal-300 transition-colors">
              Beranda
            </Link>
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Eksplorasi
            </Link>
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
