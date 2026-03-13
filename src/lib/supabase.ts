import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations with service role
export const getSupabaseAdmin = () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    return createClient(supabaseUrl, serviceRoleKey);
};
