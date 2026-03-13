import { supabase } from '@/lib/supabase';
import { Campaign } from '@/types/database';
import Link from 'next/link';

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
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Campaign Explorer
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Portal Donasi Transparan. Bantu sesama dengan keterbukaan data riel-time dan rekam jejak yang jelas.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button className="bg-teal-500/20 text-teal-400 border border-teal-500/50 px-6 py-2 rounded-full font-medium transition-colors">
            Semua
          </button>
          <button className="bg-slate-900/50 border border-slate-800 px-6 py-2 rounded-full font-medium hover:border-slate-700 text-slate-300 transition-colors">
            Pendidikan
          </button>
          <button className="bg-slate-900/50 border border-slate-800 px-6 py-2 rounded-full font-medium hover:border-slate-700 text-slate-300 transition-colors">
            Kesehatan
          </button>
          <button className="bg-slate-900/50 border border-slate-800 px-6 py-2 rounded-full font-medium hover:border-slate-700 text-slate-300 transition-colors">
            Bencana Alam
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns?.map((campaign: Campaign) => {
            const progress = (campaign.current_amount / campaign.target_amount) * 100;
            return (
              <div key={campaign.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-teal-500/5 relative flex flex-col h-full">
                {/* Badge mockup */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-teal-500/90 text-slate-950 rounded text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  Aktif
                </div>
                {/* Fallback image area if image wasn't loaded - MVP just using a gradient placeholder */}
                <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-800/50 flex items-center justify-center">
                   <div className="h-12 w-12 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/50">
                     <span className="text-xl">❤</span>
                   </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{campaign.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">{campaign.description}</p>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Terkumpul</p>
                        <p className="text-xl font-bold text-teal-400">
                          Rp {new Intl.NumberFormat('id-ID').format(campaign.current_amount)}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                        dari Rp {new Intl.NumberFormat('id-ID').format(campaign.target_amount)}
                      </p>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${Math.min(Math.round(progress), 100)}%` }} 
                        />
                      </div>
                      <p className="text-right text-[11px] font-medium text-slate-400">{Math.min(Math.round(progress), 100)}% tercapai</p>
                    </div>
                    
                    <Link href={`/campaign/${campaign.id}`} className="block pt-2">
                       <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 active:scale-[0.98]">
                         Donasi Sekarang
                       </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {(!campaigns || campaigns.length === 0) && (
          <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800/50 border-dashed">
            <div className="h-16 w-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm3.65 0c0 .414.168.75.375.75s.375-.336.375-.75-.168-.75-.375-.75-.375.336-.375.75Z" />
              </svg>
            </div>
            <p className="text-slate-400 text-lg font-medium">Belum ada campaign aktif saat ini.</p>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">Kami sedang mempersiapkan campaign untuk Anda. Silahkan kembali lagi nanti.</p>
          </div>
        )}
      </div>
    </main>
  );
}
