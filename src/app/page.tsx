import { supabase } from '@/lib/supabase';
import { Campaign } from '@/types/database';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export const revalidate = 5;

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
        <div className="flex flex-col gap-8 lg:flex-row items-center py-12 md:py-20 mb-10">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="flex flex-col gap-4">
              <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight transition-colors">
                Transparansi Penuh untuk Setiap <span className="text-primary">Niat Baik.</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed transition-colors">
                Platform penggalangan dana di mana setiap rupiah yang masuk dicatat secara publik dan terverifikasi secara real-time.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:placeholder@gmail.com?subject=Kerjasama%20Memulai%20Campaign%20Baru" 
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30"
              >
                Mulai Campaign
              </a>
              <a 
                href="#why-carefund"
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-750"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
            <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 shadow-2xl flex items-center justify-center">
              <Image 
                src="https://plus.unsplash.com/premium_photo-1661605574121-fd0cc6199b52?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="CareFund Heroes"
                fill
                className="object-cover"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8 z-20">
                <div className="flex items-center gap-4 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-slate-600/30 w-full transition-colors">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-primary flex items-center justify-center text-xs font-bold text-white">1</div>
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-teal-500 flex items-center justify-center text-xs font-bold text-white">2</div>
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-500 flex items-center justify-center text-xs font-bold text-white">3</div>
                  </div>
                  <p className="text-white text-sm font-medium">Bergabung bersama para donatur minggu ini</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Pilih Kebaikanmu</span>
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight transition-colors">Campaign Terkini</h2>
          </div>
          <Link href="/campaigns" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            Lihat Semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Grid Campaign */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns?.slice(0, 6).map((campaign: Campaign) => {
            const progress = (campaign.current_amount / campaign.target_amount) * 100;
            return (
              <div key={campaign.id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-slate-700/40 hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full">
                {/* Fallback image area */}
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {campaign.image_url ? (
                    <Image 
                      src={campaign.image_url}
                      alt={campaign.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-teal-400/30 dark:to-teal-500/20 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-50 mix-blend-multiply dark:mix-blend-screen">
                        <Heart className="w-16 h-16 text-primary fill-primary/20" />
                      </div>
                    </>
                  )}
                  
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

        {campaigns && campaigns.length > 6 && (
          <div className="flex justify-center mt-12">
            <Link href="/campaigns" className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-12 px-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold transition-all shadow-sm hover:shadow-md hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-white dark:hover:text-primary dark:hover:border-white">
              Lihat Lebih Banyak
            </Link>
          </div>
        )}
        
        {(!campaigns || campaigns.length === 0) && (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 border-dashed transition-colors mt-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center text-primary mb-4 transition-colors">
              <span className="material-symbols-outlined text-4xl">favorite border</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium transition-colors">Belum ada campaign aktif saat ini.</p>
          </div>
        )}

        {/* Why CareFund Section */}
        <section id="why-carefund" className="mt-24 mb-10 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform rounded-2xl duration-300"></div>
                 <span className="material-symbols-outlined text-4xl relative z-10">verified_user</span>
               </div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Terverifikasi</h4>
               <p className="text-slate-500 dark:text-slate-400 transition-colors">Setiap campaign melalui proses kurasi ketat untuk menjamin validitas.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform rounded-2xl duration-300"></div>
                 <span className="material-symbols-outlined text-4xl relative z-10">visibility</span>
               </div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Transparan</h4>
               <p className="text-slate-500 dark:text-slate-400 transition-colors">Arus kas tercatat publik, dapat dipantau siapa saja kapan saja.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform rounded-2xl duration-300"></div>
                 <span className="material-symbols-outlined text-4xl relative z-10">speed</span>
               </div>
               <h4 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Real-time</h4>
               <p className="text-slate-500 dark:text-slate-400 transition-colors">Donasi langsung tercatat dan masuk ke wallet campaign secara instan.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
