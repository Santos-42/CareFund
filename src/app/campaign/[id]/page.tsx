import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import CheckoutForm from '@/components/CheckoutForm';

export const dynamic = 'force-dynamic';

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single();

  if (campaignError || !campaign) {
    notFound();
  }

  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('campaign_id', id)
    .eq('status', 'success')
    .order('created_at', { ascending: false });

  const progress = Math.min((campaign.current_amount / campaign.target_amount) * 100, 100);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Detail & Ledger */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Campaign Info */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-200 dark:border-teal-500/30 transition-colors">
                Campaign Penggalangan Dana
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
                {campaign.title}
              </h1>
            </div>

            {/* Fallback image area if image wasn't loaded - MVP just using a gradient placeholder */}
            <div className="h-64 md:h-96 w-full bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center relative overflow-hidden transition-colors">
               <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-slate-200/50 dark:from-teal-500/10 dark:to-brand-navy/20 mix-blend-overlay dark:mix-blend-overlay transition-colors"></div>
               <div className="h-20 w-20 rounded-full bg-white/80 dark:bg-slate-900/80 flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 mb-4 z-10 shadow-2xl transition-colors">
                 <span className="text-3xl">🤝</span>
               </div>
               <p className="text-slate-500 dark:text-slate-400 font-medium z-10 transition-colors">CareFund Campaign Highlight</p>
            </div>
            
            <div className="p-8 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 transition-colors">Dana Terkumpul</p>
                  <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 transition-colors">
                    Rp {new Intl.NumberFormat('id-ID').format(campaign.current_amount)}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 transition-colors">Target Donasi</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
                    Rp {new Intl.NumberFormat('id-ID').format(campaign.target_amount)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                  <div 
                    className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out relative" 
                    style={{ width: `${Math.round(progress)}%` }} 
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
                <p className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">{Math.round(progress)}% dari target tercapai</p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Tentang Campaign Ini</h3>
              <p className="whitespace-pre-wrap leading-relaxed">{campaign.description}</p>
            </div>
          </div>

          {/* Public Ledger */}
          <div className="pt-10 border-t border-slate-200 dark:border-slate-800 lg:pr-8 transition-colors">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Transparansi Donasi</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full transition-colors">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono uppercase tracking-widest transition-colors">LIVE SUPABASE DB</span>
              </div>
            </div>
            
            {donations && donations.length > 0 ? (
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-colors">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
                        <th className="py-4 px-6 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider transition-colors">Waktu</th>
                        <th className="py-4 px-6 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider transition-colors">Donatur</th>
                        <th className="py-4 px-6 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-right transition-colors">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50 transition-colors">
                      {donations.map((d: any) => (
                        <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-500 text-sm font-mono group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors">
                            {new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d.created_at))}
                          </td>
                          <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-300 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700 flex items-center justify-center text-teal-600 dark:text-teal-400 text-xs font-bold uppercase transition-colors">
                                {d.donor_name ? d.donor_name.substring(0, 2) : 'AN'}
                              </div>
                              <span className="truncate max-w-[150px] md:max-w-xs">{d.donor_name || 'Anonim'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-teal-600 dark:text-teal-400/90 transition-colors">
                            Rp {new Intl.NumberFormat('id-ID').format(d.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 border-dashed transition-colors">
                <div className="h-12 w-12 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-100 dark:border-transparent transition-colors">
                  <span className="text-slate-500">💡</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium h-6 transition-colors">Belum ada donasi yang tercatat.</p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-1 transition-colors">Jadilah yang pertama mendukung inisiatif ini!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Checkout */}
        <div className="lg:col-span-1">
          <CheckoutForm campaignId={campaign.id} />
        </div>
      </div>
    </main>
  );
}
