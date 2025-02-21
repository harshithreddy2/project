/*
  # Initial Schema for Food Wastage Reduction System

  1. New Tables
    - food_listings
      - id (uuid, primary key)
      - created_by (uuid, references auth.users)
      - title (text)
      - description (text)
      - quantity (text)
      - expiration_date (timestamptz)
      - pickup_location (text)
      - status (text)
      - claimed_by (uuid, references auth.users)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on food_listings table
    - Add policies for CRUD operations
*/

CREATE TABLE food_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  quantity text NOT NULL,
  expiration_date timestamptz NOT NULL,
  pickup_location text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  claimed_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE food_listings ENABLE ROW LEVEL SECURITY;

-- Anyone can view available listings
CREATE POLICY "Anyone can view available listings"
  ON food_listings
  FOR SELECT
  USING (status = 'available' OR auth.uid() = created_by OR auth.uid() = claimed_by);

-- Only authenticated users can create listings
CREATE POLICY "Authenticated users can create listings"
  ON food_listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Users can update their own listings
CREATE POLICY "Users can update own listings"
  ON food_listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Allow receivers to claim available listings
CREATE POLICY "Receivers can claim available listings"
  ON food_listings
  FOR UPDATE
  TO authenticated
  USING (status = 'available')
  WITH CHECK (
    status = 'claimed' AND 
    claimed_by = auth.uid() AND
    auth.uid() != created_by
  );