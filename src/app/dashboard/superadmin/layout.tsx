"use client";

import { DashboardContent } from "../layout";
import { RouteGuard } from "@/components/auth/route-guard";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles={["superadmin"]}>
      <DashboardContent>
        {children}
      </DashboardContent>
    </RouteGuard>
  );
}

