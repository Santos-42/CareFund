import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CheckoutForm from '@/components/CheckoutForm';
import ShareButtons from '@/components/ShareButtons';
import DonationsLedger from '@/components/DonationsLedger';

export const revalidate = 5;

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
          <div className="rounded-2xl overflow-hidden relative h-[400px]">
             {campaign.image_url ? (
               <Image 
                 src={campaign.image_url}
                 alt={campaign.title}
                 fill
                 className="object-cover"
                 priority
               />
             ) : (
               <>
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-slate-200/50 dark:from-primary/20 dark:to-brand-navy/30 mix-blend-overlay dark:mix-blend-overlay transition-colors"></div>
                 <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-100 dark:bg-slate-800 transition-colors">
                   <span className="text-6xl opacity-50">🤝</span>
                 </div>
               </>
             )}
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 z-10 transition-colors pb-20">
               <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4 shadow-sm">Kemanusiaan</span>
               <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight mb-4 drop-shadow-lg">{campaign.title}</h2>
             </div>
          </div>

          {/* Progress Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors mb-12 relative z-20 mt-[-4rem] mx-4 sm:mx-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 transition-colors">Terkumpul</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white transition-colors">
                    Rp {new Intl.NumberFormat('id-ID').format(campaign.current_amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 transition-colors">Target</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300 transition-colors">
                    Rp {new Intl.NumberFormat('id-ID').format(campaign.target_amount)}
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 sm:h-4 rounded-full overflow-hidden transition-colors">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              
              <div className="flex justify-between items-center text-sm font-medium pt-2">
                <span className="text-primary font-bold">{Math.round((campaign.current_amount / campaign.target_amount) * 100)}% Tercapai</span>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {donations?.length || 0} Donatur
                </span>
              </div>
            </div>
          </section>

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
          <DonationsLedger donations={donations || []} />
        </div>

        {/* Right Side: Sticky Checkout */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <CheckoutForm campaignId={campaign.id} />
            <ShareButtons title={campaign.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
