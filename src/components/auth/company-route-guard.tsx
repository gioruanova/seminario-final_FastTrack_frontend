"use client";

import { useEffect, startTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RouteGuard } from "./route-guard";
import { useAuth } from "@/context/AuthContext";
import { isCompanyUser } from "@/types/auth";

interface CompanyRouteGuardProps {
  children: React.ReactNode;
  allowedRoles: Array<"owner" | "operador">;
  redirectTo: "/dashboard/owner" | "/dashboard/operador";
  requireActiveCompany?: boolean;
}

export function CompanyRouteGuard({
  children,
  allowedRoles,
  redirectTo,
  requireActiveCompany = true,
}: CompanyRouteGuardProps) {
  const { companyConfig, user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      requireActiveCompany &&
      !isLoading &&
      user &&
      isCompanyUser(user) &&
      companyConfig?.company?.company_estado === 0 &&
      pathname !== redirectTo
    ) {
      startTransition(() => {
        router.push(redirectTo);
      });
    }
  }, [companyConfig, router, isLoading, user, redirectTo, requireActiveCompany, pathname]);

  if (
    requireActiveCompany &&
    !isLoading &&
    user &&
    isCompanyUser(user) &&
    companyConfig?.company?.company_estado === 0 &&
    pathname !== redirectTo
  ) {
    return null;
  }

  return <RouteGuard allowedRoles={allowedRoles}>{children}</RouteGuard>;
}
