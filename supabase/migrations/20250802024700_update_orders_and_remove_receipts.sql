-- Add 'rejected' to the order_status enum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'rejected' AND enumtypid = 'order_status'::regtype) THEN
        ALTER TYPE order_status ADD VALUE 'rejected';
    END IF;
END$$;

-- Add rejection_reason column to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Remove payment_receipt column from orders table
ALTER TABLE public.orders DROP COLUMN IF EXISTS payment_receipt;

-- Remove the receipts storage bucket
-- Note: Supabase CLI handles storage bucket creation, but doesn't have a direct way to delete them in migrations.
-- This SQL will delete the bucket from the storage schema.
DELETE FROM storage.buckets WHERE id = 'receipts';
