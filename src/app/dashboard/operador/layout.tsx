"use client";

import { DashboardContent } from "../layout";
import { CompanyRouteGuard } from "@/components/auth/company-route-guard";

export default function OperadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyRouteGuard allowedRoles={["operador"]} redirectTo="/dashboard/operador">
      <DashboardContent>
        {children}
      </DashboardContent>
    </CompanyRouteGuard>
  );
}

