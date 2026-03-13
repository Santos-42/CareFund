import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { campaignId, donorName, amount } = body;

    if (!campaignId || !amount) {
      return NextResponse.json({ error: 'campaignId dan amount wajib diisi' }, { status: 400 });
    }

    const MAYAR_API_KEY = process.env.MAYAR_API_KEY;
    if (!MAYAR_API_KEY) {
      return NextResponse.json({ error: 'MAYAR_API_KEY tidak dikonfigurasi' }, { status: 500 });
    }

    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // 1. Create Single Payment Request on Mayar
    const mayarRes = await fetch('https://api.mayar.id/hl/v1/payment/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAYAR_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: donorName || 'Anonim',
        email: 'anonim@carefund.local',
        mobile: '081200000000',
        amount: Number(amount),
        description: `Donasi - Campaign ${campaignId}`,
        redirectUrl: `${NEXT_PUBLIC_BASE_URL}/campaign/${campaignId}`
      })
    });

    const mayarData = await mayarRes.json();
    
    if (!mayarRes.ok) {
      console.error('Mayar Error:', mayarData);
      return NextResponse.json({ error: mayarData.message || 'Gagal membuat pembayaran Mayar' }, { status: 500 });
    }

    const mayarTrxId = mayarData.data?.id;
    const checkoutUrl = mayarData.data?.link;

    if (!mayarTrxId || !checkoutUrl) {
      return NextResponse.json({ error: 'Respons tak terduga dari Mayar' }, { status: 500 });
    }

    // 2. Save to Supabase (Pending) using Service Role (admin)
    const supabaseAdmin = getSupabaseAdmin();
    const { error: insertError } = await supabaseAdmin
      .from('donations')
      .insert([
        {
          campaign_id: campaignId,
          donor_name: donorName || 'Anonim',
          amount: Number(amount),
          mayar_trx_id: mayarTrxId,
          status: 'pending'
        }
      ]);

    if (insertError) {
      console.error('Supabase Error:', insertError);
      return NextResponse.json({ error: 'Gagal mencatat donasi ke database' }, { status: 500 });
    }

    // 3. Return the generic payload
    return NextResponse.json({ checkoutUrl });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
