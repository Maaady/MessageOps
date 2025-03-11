/*
  # Create messages table for SMS tracking

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `phone_number` (text, recipient's phone number)
      - `message` (text, message content)
      - `status` (text, message status: pending/sent/failed)
      - `scheduled_for` (timestamp, optional scheduled send time)
      - `created_at` (timestamp)
      - `sent_at` (timestamp, when the message was actually sent)
      - `error` (text, optional error message if sending failed)

  2. Security
    - Enable RLS on `messages` table
    - Add policies for authenticated users to manage their messages
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  scheduled_for timestamptz,
  created_at timestamptz DEFAULT now(),
  sent_at timestamptz,
  error text,
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

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