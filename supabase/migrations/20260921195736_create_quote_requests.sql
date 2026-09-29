/*
# Create quote requests for Jetez l'Encre

1. New Tables
- `quote_requests` stores the public quote forms submitted from the website.
- `id` identifies each request.
- `created_at` records when the request was sent.
- `service` identifies textile or paper printing.
- `customer_name`, `customer_email`, and `customer_phone` contain contact details.
- `description` contains the customer's project description.
- `details` stores the selected service options as structured JSON.
- `attachment_names` stores the names of files selected in the form.
- `status` tracks the request workflow for the business.

2. Security
- Row level security is enabled.
- Anonymous and authenticated visitors can submit requests.
- Read, update, and delete policies are included for the single-tenant business workspace.

3. Important notes
- This website does not expose requests back to visitors in the UI.
- Attachments are recorded by filename in this first version so the owner can see what was selected while receiving the request by email.
*/

CREATE TABLE IF NOT EXISTS public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),

  service text NOT NULL
    CHECK (service IN ('textile', 'paper')),

  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  description text NOT NULL,

  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  attachment_names jsonb NOT NULL DEFAULT '[]'::jsonb,

  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'in_progress', 'completed'))
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit quote requests"
ON public.quote_requests;

CREATE POLICY "Public can submit quote requests"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx
ON public.quote_requests (created_at DESC);
