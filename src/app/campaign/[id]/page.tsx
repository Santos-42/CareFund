import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 mt-4 transition-colors">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium transition-colors">{campaign.title}</span>
          </nav>

          {/* Hero Section */}
          <div className="rounded-2xl overflow-hidden mb-12 relative h-[400px]">
             {/* Fallback pattern */}
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-slate-200/50 dark:from-primary/20 dark:to-brand-navy/30 mix-blend-overlay dark:mix-blend-overlay transition-colors"></div>
             
             <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-100 dark:bg-slate-800 transition-colors">
               <span className="text-6xl opacity-50">🤝</span>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 z-10 transition-colors">
               <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4 shadow-sm">Kemanusiaan</span>
               <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight mb-4 drop-shadow-lg">{campaign.title}</h2>
             </div>
          </div>

          {/* Campaign About Info */}
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white transition-colors">
              <span className="material-symbols-outlined text-primary">description</span>
              Tentang Campaign
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 transition-colors">
              <p className="whitespace-pre-wrap">{campaign.description}</p>
            </div>
          </section>

          {/* Public Ledger */}
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
            
            <div className="overflow-x-auto">
              {donations && donations.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider transition-colors">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Waktu</th>
                      <th className="px-6 py-4 font-semibold">Nama Donatur</th>
                      <th className="px-6 py-4 font-semibold text-right">Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                    {donations.map((d: any) => (
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
        </div>

        {/* Right Side: Sticky Checkout */}
        <div className="lg:col-span-1">
          <CheckoutForm campaignId={campaign.id} />
        </div>
      </div>
    </main>
  );
}
