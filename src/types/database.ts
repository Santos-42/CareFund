export interface Campaign {
  id: string;
  title: string;
  description: string | null;
  target_amount: number;
  current_amount: number;
  image_url: string | null;
  created_at: string;
}

export interface Donation {
  id: string;
  campaign_id: string;
  donor_name: string;
  amount: number;
  mayar_trx_id: string | null;
  status: 'pending' | 'success' | 'failed';
  created_at: string;
}
