# CareFund - Portal Donasi Transparan

CareFund adalah platform penggalangan dana (donasi) modern yang fokus pada transparansi penuh. Setiap rupiah yang disumbangkan dicatat secara publik dan dapat diverifikasi secara real-time melalui integrasi dengan payment gateway Mayar dan database Supabase.

## ✨ Fitur Utama

- **Landing Page Dinamis**: Menampilkan daftar kampanye aktif dengan indikator progres dana terkumpul secara visual.
- **Halaman Detail Kampanye**: Informasi lengkap mengenai setiap misi penggalangan dana.
- **Formulir Donasi Statis**: Proses donasi yang cepat tanpa perlu login/autentikasi.
- **Integrasi Mayar Headless API**: Menghasilkan link pembayaran otomatis untuk berbagai metode pembayaran (E-Wallet, VA, QRIS).
- **Public Ledger (Buku Besar Publik)**: Menampilkan riwayat transaksi donasi yang berhasil secara transparan di setiap halaman kampanye.
- **Dark & Light Mode**: Dukungan tema gelap dan terang untuk kenyamanan pengguna.

## 🛠️ Teknologi (Stack)

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Payment Gateway**: [Mayar Headless API](https://docs.mayar.id/)
- **Icons**: [Lucide React](https://lucide.dev/) & Google Material Symbols

## 🚀 Memulai (Getting Started)

### 1. Persiapan Environment
Buat file `.env.local` di root direktori dan isi dengan kredensial berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MAYAR_API_KEY=your_mayar_api_key
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

## 📊 Skema Database

Proyek ini menggunakan dua tabel utama di Supabase:

### Tabel `campaigns`
Menyimpan informasi kampanye penggalangan dana.
- `id` (uuid, primary key)
- `title` (text)
- `description` (text)
- `target_amount` (numeric)
- `current_amount` (numeric, default 0)
- `created_at` (timestamp)

### Tabel `donations`
Menyimpan data donasi yang masuk.
- `id` (uuid, primary key)
- `campaign_id` (uuid, foreign key ke `campaigns`)
- `donor_name` (text, default 'Anonim')
- `amount` (numeric)
- `mayar_trx_id` (text, unik)
- `status` (text, default 'pending')
- `created_at` (timestamp)

## 🔗 Integrasi Mayar & Webhook

Proyek ini menggunakan integrasi API Mayar untuk memproses pembayaran:
- **Create Payment Request**: Digunakan untuk membuat tautan pembayaran saat donatur mengirimkan formulir.
- **Webhook Listener**: Endpoint `/api/webhooks/mayar` menangani notifikasi pembayaran berhasil dari Mayar untuk memperbarui status donasi dan total dana kampanye secara otomatis.

---

Dibangun untuk **Vibecoding Competition Mayar 2026**.
