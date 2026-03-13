"use client";

import { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, Facebook, MessageCircle } from 'lucide-react';

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      if (url) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors mt-8">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-primary" />
        Bantu Sebarkan
      </h3>
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors text-sm"
        >
          <LinkIcon className="w-4 h-4" />
          {copied ? 'Tersalin!' : 'Salin Link'}
        </button>
        <button 
          onClick={shareWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-medium transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
        <button 
          onClick={shareFacebook}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 font-medium transition-colors text-sm"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </button>
      </div>
    </div>
  );
}
