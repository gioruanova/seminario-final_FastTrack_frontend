"use client";

import { StatsOverview } from "@/components/superadmin/stats-overview";
import { ReclamosChart } from "@/components/superadmin/reclamos-chart";
import { LogsActivity } from "@/components/superadmin/logs-activity";

export function SuperadminDashboard() {
  return (
    <div className="space-y-6">
      <StatsOverview />
      <ReclamosChart />
      <LogsActivity />
    </div>
  );
}

