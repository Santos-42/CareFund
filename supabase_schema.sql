-- Create campaigns table
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    target_amount NUMERIC NOT NULL,
    current_amount NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donations table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    donor_name TEXT DEFAULT 'Anonim',
    amount NUMERIC NOT NULL,
    mayar_trx_id TEXT UNIQUE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Policies for campaigns
CREATE POLICY "Public can read campaigns" 
ON campaigns FOR SELECT 
USING (true);

-- Policies for donations
CREATE POLICY "Public can read successful donations" 
ON donations FOR SELECT 
USING (status = 'success');

-- No public inserts/updates/deletes
-- (Backend will use Service Role Key to bypass RLS for writes)
