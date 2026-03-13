'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function DonationForm({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          amount: Number(formData.amount),
          donorName: formData.donorName || 'Anonim',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Gagal membuat link pembayaran. Coba lagi nanti.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-8 border-none shadow-xl">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
        <CardTitle className="text-xl">Kirim Donasi</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Nominal Donasi (Rp)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Min. 10000"
              required
              min="10000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="text-lg font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nama Donatur</Label>
            <Input
              id="name"
              type="text"
              placeholder="Masukkan nama Anda"
              value={formData.donorName}
              onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Pesan (Opsional)</Label>
            <Input
              id="message"
              type="text"
              placeholder="Beri semangat atau doa"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="pb-6">
          <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Lanjutkan Pembayaran'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
