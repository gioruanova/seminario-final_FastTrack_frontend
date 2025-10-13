"use client";

import { DashboardProvider } from "@/context/DashboardContext";
import { StatsOverview } from "@/components/superadmin/stats-overview";
import { SuperadminUpcomingReclamos } from "@/components/superadmin/upcoming-reclamos";
import { ReclamosChart } from "@/components/superadmin/reclamos-chart";
import { LogsActivity } from "@/components/superadmin/logs-activity";

export function SuperadminDashboard() {
  return (
    <DashboardProvider>
      <div className="space-y-6">
        <StatsOverview />
        <SuperadminUpcomingReclamos />
        <ReclamosChart />
        <LogsActivity />
      </div>
    </DashboardProvider>
  );
}

