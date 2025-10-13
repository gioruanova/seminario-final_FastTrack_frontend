"use client";

import { CompanyUser } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OwnerStatsOverview } from "@/components/owner/stats-overview";
import { OwnerUpcomingReclamos } from "@/components/owner/upcoming-reclamos";
import { OwnerLogsActivity } from "@/components/owner/logs-activity";

interface OwnerDashboardProps {
  user: CompanyUser;
}

export function OwnerDashboard({ user }: OwnerDashboardProps) {
  const { companyConfig } = useAuth();

  const getDisplayName = () => {
    const userName = user.user_name;
    if (userName) {
      return userName;
    }
    return user.user_email?.split('@')[0] || "Usuario";
  };

  return (
    <DashboardProvider>
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Bienvenido, {getDisplayName()}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <span className="text-sm">
              {user.company_name}
            </span>
            <span>-</span>
            <span className="text-sm font-bold uppercase">
              {companyConfig?.company.company_estado === 1 ? (
                <span className='text-green-500'>Activo</span>
              ) : (
                <span className='text-red-500'>Inactivo</span>
              )}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>

      <OwnerStatsOverview />
      <OwnerUpcomingReclamos />
      <OwnerLogsActivity />
    </div>
    </DashboardProvider>
  );
}

