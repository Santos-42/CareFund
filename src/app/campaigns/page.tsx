import { supabase } from '@/lib/supabase';
import { Campaign } from '@/types/database';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
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
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black tracking-tight transition-colors">
            Semua <span className="text-primary">Campaign</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg transition-colors max-w-2xl">
            Jelajahi berbagai inisiatif kebaikan dan mari bersama-sama menciptakan dampak positif yang nyata.
          </p>
        </div>

        {/* Grid Campaign */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns?.map((campaign: Campaign) => {
            const progress = (campaign.current_amount / campaign.target_amount) * 100;
            return (
              <div key={campaign.id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-slate-700/40 hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full">
                {/* Fallback image area */}
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-orange-400/30 dark:to-orange-500/20 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-50 mix-blend-multiply dark:mix-blend-screen">
                    <Heart className="w-16 h-16 text-primary fill-primary/20" />
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                      Kemanusiaan
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight line-clamp-2 transition-colors">{campaign.title}</h3>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500 dark:text-slate-400 transition-colors">Terkumpul: <span className="text-slate-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(campaign.current_amount)}</span></span>
                        <span className="text-primary font-bold">{Math.round(progress)}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden transition-colors">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${Math.min(Math.round(progress), 100)}%` }} 
                        />
                      </div>
                      <p className="text-slate-400 dark:text-slate-500 text-xs text-right transition-colors">Target: Rp {new Intl.NumberFormat('id-ID').format(campaign.target_amount)}</p>
                    </div>
                    
                    <Link href={`/campaign/${campaign.id}`} className="block">
                       <button className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl h-11 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold transition-colors hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white dark:hover:bg-white dark:hover:text-primary dark:group-hover:bg-white dark:group-hover:text-primary">
                         Lihat Detail <span className="material-symbols-outlined text-sm">visibility</span>
                       </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {(!campaigns || campaigns.length === 0) && (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 border-dashed transition-colors mt-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center text-primary mb-4 transition-colors">
              <span className="material-symbols-outlined text-4xl">favorite border</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium transition-colors">Belum ada campaign aktif saat ini.</p>
          </div>
        )}
      </div>
    </main>
  );
}
