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

-- Function to handle successful donation atomically
CREATE OR REPLACE FUNCTION handle_successful_donation(p_donation_id UUID)
RETURNS VOID AS $$
DECLARE
    v_campaign_id UUID;
    v_amount NUMERIC;
    v_status TEXT;
BEGIN
    -- Get donation details and lock the row
    SELECT campaign_id, amount, status INTO v_campaign_id, v_amount, v_status
    FROM donations
    WHERE id = p_donation_id
    FOR UPDATE;

    -- Only process if status is pending
    IF v_status = 'pending' THEN
        -- Update donation status
        UPDATE donations
        SET status = 'success'
        WHERE id = p_donation_id;

        -- Update campaign current_amount
        UPDATE campaigns
        SET current_amount = current_amount + v_amount
        WHERE id = v_campaign_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
