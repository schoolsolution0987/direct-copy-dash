import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseModuleDashboard } from "@/components/enterprise-ui/EnterpriseModuleDashboard";
import { MODULES } from "@/lib/enterprise-data/modules";

export const Route = createFileRoute("/modules/$moduleKey")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Module Dashboard — Software Vala" },
      {
        name: "description",
        content:
          "Unified enterprise dashboard for a single Software Vala module: live KPIs, records and states.",
      },
      { property: "og:title", content: "Module Dashboard — Software Vala" },
      {
        property: "og:description",
        content:
          "Unified enterprise dashboard for a single Software Vala module: live KPIs, records and states.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ModuleDashboardRoute,
});

function ModuleDashboardRoute() {
  const { moduleKey } = Route.useParams();
  return <EnterpriseModuleDashboard moduleKey={moduleKey as keyof typeof MODULES} />;
}
