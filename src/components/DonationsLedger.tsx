'use client';

import { useState } from 'react';

type Donation = {
  id: string;
  donor_name: string | null;
  amount: number;
  created_at: string;
};

interface DonationsLedgerProps {
  donations: Donation[];
}

export default function DonationsLedger({ donations }: DonationsLedgerProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleDonations = donations?.slice(0, visibleCount);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white transition-colors">
          <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          Public Ledger
        </h3>
        <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 transition-colors">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
          <span className="tracking-widest uppercase text-[10px] font-bold">Live Updates</span>
        </div>
      </div>
      
      <div className="overflow-x-auto p-0">
        {donations && donations.length > 0 ? (
          <>
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider transition-colors">
                <tr>
                  <th className="px-6 py-4 font-semibold">Waktu</th>
                  <th className="px-6 py-4 font-semibold">Nama Donatur</th>
                  <th className="px-6 py-4 font-semibold text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                {visibleDonations.map((d: Donation) => (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-mono transition-colors">
                      {new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d.created_at))}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-slate-800 border border-primary/20 dark:border-slate-700 flex items-center justify-center text-primary text-xs font-bold uppercase transition-colors">
                          {d.donor_name ? d.donor_name.substring(0, 2) : 'AN'}
                        </div>
                        <span className="truncate max-w-[150px] md:max-w-xs">{d.donor_name || 'Anonim'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary text-right transition-colors">
                      Rp {new Intl.NumberFormat('id-ID').format(d.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleCount < donations.length && (
              <div className="flex justify-center p-6 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={handleLoadMore}
                  className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-12 px-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold transition-all shadow-sm hover:shadow-md hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-white dark:hover:text-primary dark:hover:border-white"
                >
                  Lihat Lebih Banyak
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl m-6 p-8 text-center border border-slate-200 dark:border-slate-700 border-dashed transition-colors">
            <div className="h-12 w-12 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-100 dark:border-transparent transition-colors">
                <span className="text-slate-400 text-2xl">💡</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors">Belum ada donasi yang tercatat.</p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-1 transition-colors">Jadilah yang pertama mendukung inisiatif ini!</p>
          </div>
        )}
      </div>
    </section>
  );
}
