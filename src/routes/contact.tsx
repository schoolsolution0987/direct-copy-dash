import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageSquare, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Software Vala — Sales & Support" },
      {
        name: "description",
        content:
          "Talk to the Software Vala team about marketplace products, partner programs, licensing and enterprise deployments.",
      },
      { property: "og:title", content: "Contact Software Vala — Sales & Support" },
      {
        property: "og:description",
        content: "Reach sales, partner and support teams for the Software Vala marketplace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const CHANNELS = [
  { icon: Mail, label: "Sales & licensing", value: "sales@softwarevala.com" },
  { icon: MessageSquare, label: "Support desk", value: "support@softwarevala.com" },
  { icon: Phone, label: "Partner hotline", value: "+91 90000 00000" },
  { icon: MapPin, label: "Head office", value: "Ahmedabad, Gujarat, India" },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home page
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">Contact us</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Questions about a product, a partner program or an enterprise rollout? Pick the
          channel that fits and our team will get back to you.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CHANNELS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Icon className="h-4 w-4" />
                {label}
              </div>
              <div className="mt-2 text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/marketplace"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Browse marketplace
          </Link>
          <Link
            to="/apply"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </div>
  );
}
