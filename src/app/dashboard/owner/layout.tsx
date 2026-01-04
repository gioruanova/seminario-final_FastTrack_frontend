"use client";

import { DashboardContent } from "../layout";
import { CompanyRouteGuard } from "@/components/auth/company-route-guard";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyRouteGuard allowedRoles={["owner"]} redirectTo="/dashboard/owner">
      <DashboardContent>
        {children}
      </DashboardContent>
    </CompanyRouteGuard>
  );
}

