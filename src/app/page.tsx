import { supabase } from '@/lib/supabase';
import { Campaign } from '@/types/database';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaigns:', error);
  }

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight transition-colors">
            Transparansi Penuh untuk Setiap Niat Baik.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto transition-colors">
            Platform penggalangan dana di mana setiap rupiah yang masuk dicatat secara publik dan terverifikasi secara real-time.
          </p>
        </div>

        {/* Grid Campaign */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns?.map((campaign: Campaign) => {
            const progress = (campaign.current_amount / campaign.target_amount) * 100;
            return (
              <div key={campaign.id} className="bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all hover:shadow-2xl hover:shadow-teal-500/10 flex flex-col h-full group">
                {/* Fallback image area */}
                <div className="h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-brand-navy dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden transition-colors">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay dark:mix-blend-overlay"></div>
                   <div className="h-14 w-14 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-500">
                     <Heart className="text-teal-500 w-6 h-6 fill-teal-500/20" />
                   </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">{campaign.title}</h3>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">Terkumpul</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
                          Rp {new Intl.NumberFormat('id-ID').format(campaign.current_amount)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                        <div 
                          className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${Math.min(Math.round(progress), 100)}%` }} 
                        />
                      </div>
                    </div>
                    
                    <Link href={`/campaign/${campaign.id}`} className="block pt-4">
                       <button className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold py-3 rounded-xl transition-all active:scale-[0.98]">
                         Lihat Detail
                       </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {(!campaigns || campaigns.length === 0) && (
          <div className="text-center py-24 bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-slate-800/50 border-dashed transition-colors">
            <div className="h-16 w-16 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 transition-colors">
              <Heart className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium transition-colors">Belum ada campaign aktif saat ini.</p>
          </div>
        )}
      </div>
    </main>
  );
}
