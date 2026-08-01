import { EnterpriseModuleDashboard } from "@/components/enterprise-ui/EnterpriseModuleDashboard";

export type BuildStatus =
  | "idle"
  | "understanding"
  | "clarifying"
  | "building"
  | "testing"
  | "deploying"
  | "complete"
  | "paused"
  | "error";

export interface ConversationMessage {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
  timestamp: string;
}

const AutoDevDashboard = () => <EnterpriseModuleDashboard moduleKey="auto-dev" />;

export default AutoDevDashboard;
