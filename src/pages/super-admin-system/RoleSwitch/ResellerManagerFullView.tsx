import { EnterpriseModuleDashboard } from "@/components/enterprise-ui/EnterpriseModuleDashboard";

interface ResellerManagerFullViewProps {
  onBack?: () => void;
}

export function ResellerManagerFullView(_props: ResellerManagerFullViewProps) {
  return <EnterpriseModuleDashboard moduleKey="reseller" />;
}

export default ResellerManagerFullView;
