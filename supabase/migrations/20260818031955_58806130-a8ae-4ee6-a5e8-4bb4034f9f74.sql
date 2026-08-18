CREATE TABLE public.marketplace_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.marketplace_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  video_url text NOT NULL,
  thumbnail_url text,
  duration text NOT NULL DEFAULT '',
  views_label text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.marketplace_faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marketplace_faqs TO authenticated;
GRANT ALL ON public.marketplace_faqs TO service_role;

GRANT SELECT ON public.marketplace_videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marketplace_videos TO authenticated;
GRANT ALL ON public.marketplace_videos TO service_role;

ALTER TABLE public.marketplace_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible faqs" ON public.marketplace_faqs
  FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Managers can read all faqs" ON public.marketplace_faqs
  FOR SELECT TO authenticated USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'boss') OR public.has_role(auth.uid(), 'founder')
  );
CREATE POLICY "Managers can write faqs" ON public.marketplace_faqs
  FOR ALL TO authenticated USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'boss') OR public.has_role(auth.uid(), 'founder')
  ) WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'boss') OR public.has_role(auth.uid(), 'founder')
  );

CREATE POLICY "Public can read visible videos" ON public.marketplace_videos
  FOR SELECT TO anon, authenticated USING (visible = true);
CREATE POLICY "Managers can read all videos" ON public.marketplace_videos
  FOR SELECT TO authenticated USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'boss') OR public.has_role(auth.uid(), 'founder')
  );
CREATE POLICY "Managers can write videos" ON public.marketplace_videos
  FOR ALL TO authenticated USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'boss') OR public.has_role(auth.uid(), 'founder')
  ) WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'boss') OR public.has_role(auth.uid(), 'founder')
  );

INSERT INTO public.marketplace_faqs (question, answer, category, position) VALUES
('What exactly do I get for $249?', 'One flat price of $249 gives you lifetime access to the selected software: full product, all major version updates for life, standard support and a single production domain. There is no monthly fee and no renewal.', 'Pricing', 1),
('Why is every product priced the same $249 lifetime?', 'A single flat lifetime price is our core USP. Whether it is a school ERP, hospital suite or multi-vendor marketplace, the price never changes — so you never have to negotiate or compare tiers.', 'Pricing', 2),
('How many products are available on Software Vala?', 'The marketplace currently ships 12,000+ software solutions organised across 80+ business categories, each with sub-category variants and a live demo.', 'Catalog', 3),
('How does 2-hour delivery work?', 'Once payment is confirmed, provisioning starts automatically. Your instance, admin credentials and setup guide are emailed within 120 minutes, 24x7.', 'Delivery', 4),
('Can I try a product before paying?', 'Yes. Every listing has an instant live demo you can open without signup, plus guided walkthrough videos in Vala TV.', 'Delivery', 5),
('Is white-label included?', 'Yes. Every $249 lifetime license includes white-label rights: your logo, brand colours, domain and email templates, with no Software Vala branding shown to your customers.', 'White Label', 6),
('Can I run the product as my own SaaS?', 'Yes. SaaS mode ships with multi-tenant separation, subscription plans, billing hooks and a tenant admin panel so you can sell subscriptions under your own brand.', 'SaaS', 7),
('Do I get the source code?', 'Full source code is included with the lifetime license, so your team can extend, audit or self-host the product.', 'Licensing', 8),
('Are there any hidden charges?', 'No. $249 is the total. Hosting, domain and optional paid add-ons are yours to choose, and we never charge listing, setup or renewal fees.', 'Pricing', 9),
('What support do I get after purchase?', '1 year of priority technical support (bug fixes, updates, deployment help) plus lifetime access to documentation, Vala Academy and community support in 12 languages.', 'Support', 10),
('Can I resell or become a franchise partner?', 'Yes. Reseller, franchise, affiliate, influencer, vendor and author programs are open from the Apply page, with margins up to 40% and city-exclusive franchise territories.', 'Partners', 11),
('Is my purchase protected?', 'All products are trademark protected and delivered with a license certificate. Payments are processed through verified gateways and every order is auditable in your dashboard.', 'Trust', 12),
('Can you customise a product for my business?', 'Yes. Customisation is quoted separately as a service; the base product stays $249 lifetime so you only pay for the extra work you request.', 'Services', 13),
('Which technology stack is used?', 'Products are built on React, TypeScript and a Node.js + PostgreSQL backend with REST APIs, so they are easy to host anywhere and integrate with your existing tools.', 'Technical', 14),
('Do you offer enterprise agreements?', 'Yes. Enterprise plans add SSO, custom SLAs, regional data residency, migration assistance and a dedicated success engineer for teams of 100+.', 'Enterprise', 15);

INSERT INTO public.marketplace_videos (title, description, video_url, duration, views_label, position) VALUES
('How MediCore 360 powers 42 hospitals', 'Hospital suite walkthrough: OPD, IPD, pharmacy and billing.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '4:12', '12k views', 1),
('Inside ShopEngine — multi-vendor at scale', 'Multi-vendor marketplace setup, payouts and delivery flow.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '7:48', '8.3k views', 2),
('Build a school OS with EduFlow', 'Admissions, attendance, fees and online classes in one platform.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '5:21', '15k views', 3),
('FactoryOS predictive maintenance demo', 'Production planning, machine health and downtime alerts.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '6:02', '4.1k views', 4),
('White-label in 10 minutes', 'Rebrand any Software Vala product with your logo and domain.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '9:35', '6.7k views', 5),
('Launch your own SaaS on the $249 license', 'Multi-tenant setup, plans and subscription billing walkthrough.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '11:04', '10k views', 6);