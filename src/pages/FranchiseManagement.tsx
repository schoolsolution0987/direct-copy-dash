import { EnterpriseModuleDashboard } from "@/components/enterprise-ui/EnterpriseModuleDashboard";

/** Franchise record shape served by the franchise API / database. */
export interface Franchise {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "suspended" | "terminated";
  territory: string;
  state: string;
  city: string;
  commission: number;
  totalSales: number;
  joinedDate: string;
  lastActive: string;
  leadRouting: boolean;
  pricingVariation: number;
}

export default function FranchiseManagement() {
  return <EnterpriseModuleDashboard moduleKey="franchise" />;
}
