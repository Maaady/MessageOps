/*
  # Update messages table with additional tracking fields

  1. Changes to messages table
    - Add validation_error field for storing validation failure reasons
    - Add delivery_status field for tracking message delivery
    - Add delivery_timestamp field for when message was delivered
    - Add retry_count field for tracking retry attempts
    - Add metadata JSONB field for additional tracking data

  2. Security
    - Update RLS policies to reflect new fields
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'validation_error'
  ) THEN
    ALTER TABLE messages 
      ADD COLUMN validation_error text,
      ADD COLUMN delivery_status text,
      ADD COLUMN delivery_timestamp timestamptz,
      ADD COLUMN retry_count integer DEFAULT 0,
      ADD COLUMN metadata jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Update existing policies to include new fields
DROP POLICY IF EXISTS "Users can manage their own messages" ON messages;
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;

CREATE POLICY "Users can manage their own messages"
  ON messages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_scheduled_for ON messages(scheduled_for);