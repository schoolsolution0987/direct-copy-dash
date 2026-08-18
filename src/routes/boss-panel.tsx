import { createFileRoute } from "@tanstack/react-router";
import LegacyBossPanelHome from "@/pages/Index";

export const Route = createFileRoute("/boss-panel")({
  head: () => ({
    meta: [
      { title: "Boss Panel — Software Vala Control Center" },
      { name: "description", content: "Boss Panel: every module, workspace and dashboard of Software Vala in one control center." },
      { property: "og:title", content: "Boss Panel — Software Vala Control Center" },
      { property: "og:description", content: "All modules and workspaces in one Boss Panel control center." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegacyBossPanelHome,
});
