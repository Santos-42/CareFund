ROLE & OBJECTIVE
Kamu adalah Senior Full-Stack Engineer ahli. Tugasmu adalah membangun MVP (Minimum Viable Product) "Portal Donasi Transparan" dalam waktu sangat singkat. Hindari over-engineering. Jangan buat sistem autentikasi (login/register). Jangan buat dashboard admin. Fokus utama adalah integrasi mulus dengan payment gateway Mayar dan menampilkan data transaksi secara transparan ke publik.

TECH STACK MUTLAK

Framework: Next.js 14 (App Router) dengan TypeScript.

Styling: Tailwind CSS dan komponen Shadcn UI.

Database: Supabase (PostgreSQL).

API Pembayaran: Mayar Headless API.

REFERENSI DOKUMENTASI API
Pahami seluruh arsitektur, parameter autentikasi, dan endpoint dari dokumentasi resmi Mayar di sini: https://docs.mayar.id/api-reference/introduction.

Gunakan Sandbox Environment untuk seluruh fase pengujian.

Gunakan API Key Header sesuai standar dokumentasi.

Fokus secara spesifik pada dua modul: Create Single Payment Request (untuk menghasilkan checkout link saat pengguna berdonasi) dan Webhook (untuk mendengarkan notifikasi pembayaran berhasil dari Mayar).

SKEMA DATABASE SUPABASE (Hanya 2 Tabel)

campaigns: id (uuid), title (text), description (text), target_amount (numeric), current_amount (numeric default 0), created_at (timestamp).

donations: id (uuid), campaign_id (uuid FK), donor_name (text default 'Anonim'), amount (numeric), mayar_trx_id (text unik), status (text default 'pending'), created_at (timestamp).

ALUR PENGGUNA (USER FLOW) & FITUR HALAMAN

Homepage (Landing): Tampilkan daftar campaign dari tabel campaigns. Gunakan komponen Card dan Progress Bar (Shadcn UI) untuk menampilkan persentase dana terkumpul (current_amount vs target_amount).

Halaman Detail Campaign: \* Sisi Kiri: Detail teks deskripsi campaign.

Sisi Kanan (Sticky Checkout): Formulir statis (Nominal Donasi, Nama Donatur, Pesan). Saat dikirim (submit), panggil API Next.js Route Handler yang akan memanggil Mayar Create Single Payment Request API. Simpan data ke tabel donations dengan status 'pending' dan redirect pengguna ke URL pembayaran Mayar yang dikembalikan oleh API.

Webhook Listener (Backend): Buat Route Handler /api/webhooks/mayar untuk mendengarkan POST request dari Mayar. Jika status transaksi 'success', perbarui tabel donations menjadi 'success' dan tambahkan nominal donasi tersebut ke current_amount di tabel campaigns.

Public Ledger (Transparansi): Di bawah halaman detail campaign, buat tabel data yang mengambil riwayat donasi dari Supabase khusus untuk transaksi berstatus 'success'. Tabel ini harus terlihat minimalis dan memperbarui datanya secara real-time.

EKSEKUSI PERTAMA
Pahami instruksi ini. Langkah pertama: berikan saya script DDL SQL lengkap untuk membuat dua tabel Supabase tersebut beserta kebijakan keamanannya (RLS) agar publik bisa membaca, tetapi hanya sistem backend yang bisa menulis. Langkah kedua: buat struktur rute dan komponen awal Next.js 14.
