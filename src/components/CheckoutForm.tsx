'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutForm({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Tidak mendapatkan link pembayaran dari Mayar');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-8 sticky top-28 transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Bantu Sekarang</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors">Donasi Anda sangat berarti bagi mereka yang membutuhkan.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-slate-700 dark:text-slate-300 transition-colors">Nominal Donasi (Rp)</Label>
          <Input
            id="amount"
            type="text"
            placeholder="Contoh: 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 rounded-xl h-12 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="donorName" className="text-slate-700 dark:text-slate-300 transition-colors">Nama Anda (Opsional)</Label>
          <Input
            id="donorName"
            type="text"
            placeholder="Sembunyikan nama? Biarkan kosong."
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 rounded-xl h-12 transition-colors"
          />
        </div>
        
        {error && <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-400/10 p-3 rounded-lg border border-red-200 dark:border-transparent transition-colors">{error}</div>}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white dark:text-slate-950 font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Bayar dengan Mayar'}
        </button>
      </form>
    </div>
  );
}
