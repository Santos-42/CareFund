import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabase';

// Helper to verify Mayar Webhook signature
function verifySignature(payload: string, signature: string, secret: string) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const digest = hmac.digest('hex');
  return digest === signature;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-mayar-signature');
    const secret = process.env.MAYAR_WEBHOOK_SECRET;

    // Verify signature if secret is provided in env
    if (secret && signature) {
      if (!verifySignature(rawBody, signature, secret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    console.log('--- WEBHOOK PAYLOAD MENTAH ---', JSON.stringify(payload, null, 2));

    // Mayar webhook structure: payload.event is the event name, payload.data is the transaction object
    // Payment success events usually are payment.received, payment.success, or similar.
    // We will check for generic success status or specific event types if needed.
    // The transaction ID from Mayar is in payload.data.id

    const mayarTrxId = payload?.data?.id;
    const isSuccessEvent = payload?.event === 'payment.received' || payload?.data?.status?.toLowerCase() === 'paid' || payload?.data?.status === true;

    if (mayarTrxId && isSuccessEvent) {
      const supabaseAdmin = getSupabaseAdmin();

      // Find the donation using Mayar Trx ID
      const { data: donation, error: findError } = await supabaseAdmin
        .from('donations')
        .select('id, status')
        .eq('mayar_trx_id', mayarTrxId)
        .single();

      if (findError || !donation) {
        console.error('Donation not found for Trx ID:', mayarTrxId);
        return NextResponse.json({ message: 'Donation transaction not found, ignoring' }, { status: 200 });
      }

      // If pending, use RPC to atomically process the success payment
      if (donation.status === 'pending') {
        const { error: rpcError } = await supabaseAdmin.rpc('handle_successful_donation', {
          p_donation_id: donation.id
        });

        if (rpcError) {
          console.error('RPC Error:', rpcError);
          return NextResponse.json({ error: 'Internal Server Error processing donation' }, { status: 500 });
        }

        console.log(`Donation ${donation.id} successfully completed via Webhook.`);
      }
    }

    // Always return 200 OK to acknowledge receipt of the webhook
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
