'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutForm({ campaignId }: { campaignId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    setError(null);

    try {
      const numAmount = parseInt(amount.replace(/\D/g, ''), 10);
      if (isNaN(numAmount) || numAmount < 10000) {
        throw new Error('Minimal donasi adalah Rp 10.000');
      }

      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          donorName: donorName || 'Anonim',
          amount: numAmount
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan saat membuat pembayaran');
      
      // Redirect to Mayar checkout
      if (data.checkoutUrl) {
        setIsLoading(false);
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Tidak mendapatkan link pembayaran dari Mayar');
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white transition-colors">Ayo Berdonasi</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors mb-4">Setiap rupiah yang Anda donasikan berarti besar bagi mereka.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Nominal Donasi</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 transition-colors">Rp</span>
              <Input
                id="amount"
                type="text"
                placeholder="10.000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary transition-all text-lg font-bold text-slate-900 dark:text-white h-auto"
              />
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 uppercase tracking-wider font-bold transition-colors">Minimal donasi Rp 10.000</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button type="button" onClick={() => setAmount('50000')} className="py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary hover:text-primary dark:hover:text-white dark:hover:border-white transition-all text-slate-700 dark:text-slate-300">Rp 50.000</button>
            <button type="button" onClick={() => setAmount('100000')} className="py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary hover:text-primary dark:hover:text-white dark:hover:border-white transition-all text-slate-700 dark:text-slate-300">Rp 100.000</button>
          </div>
          
          <div>
            <Label htmlFor="donorName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Nama Anda (Opsional)</Label>
            <Input
              id="donorName"
              type="text"
              placeholder="Sembunyikan nama? Biarkan kosong."
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white h-auto placeholder:text-slate-400"
            />
          </div>
          
          {error && <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-transparent transition-colors">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Menghubungkan ke Mayar...</span>
              </>
            ) : (
              <>
                <span>Bayar dengan Mayar</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 text-slate-400 transition-colors">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
          <p className="text-[11px] leading-tight">Sistem pembayaran aman & terverifikasi oleh OJK melalui mitra kami.</p>
        </div>
    </div>
  );
}
