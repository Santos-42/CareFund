require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  const { data, error } = await supabase.from('campaigns').insert([
    {
      title: 'Bantuan Biaya Sekolah Anak Panti Asuhan Harapan',
      description: 'Mari bantu anak-name panti asuhan harapan untuk tetap bisa mengenyam pendidikan yang layak. Dana akan digunakan untuk SPP dan alat tulis.',
      target_amount: 50000000,
      current_amount: 12500000,
    },
    {
      title: 'Bantuan Darurat Korban Gempa',
      description: 'Sebuah gempa bumi telah menghancurkan sebagian besar pemukiman. Mari bantu bangun kembali rumah mereka.',
      target_amount: 100000000,
      current_amount: 8500000,
    }
  ]).select();

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded data:', data);
  }
}

seed();
