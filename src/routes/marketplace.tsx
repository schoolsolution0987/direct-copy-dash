import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import "@/styles/marketplace-home.css";
import HomeIndex from "@/components/marketplace-home/HomeIndex";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — 147 Ready-to-Deploy Software Solutions" },
      {
        name: "description",
        content:
          "Explore the Software Vala marketplace: 147 deployable solutions across 20 master categories with live demos, source code and lifetime access.",
      },
      { property: "og:title", content: "Marketplace — 147 Ready-to-Deploy Software Solutions" },
      {
        property: "og:description",
        content: "Live demos, full source code and lifetime access across 20 master categories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketplacePage,
});

const Loading = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#0a1526]">
    <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-cyan-400 animate-spin" />
  </div>
);

function MarketplacePage() {
  return (
    <div className="mpc-home">
      <Suspense fallback={<Loading />}>
        <HomeIndex />
      </Suspense>
    </div>
  );
}
