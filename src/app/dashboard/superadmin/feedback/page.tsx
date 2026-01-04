"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardProvider } from "@/context/DashboardContext";
import { SuperadminFeedbackPage } from "@/components/features/feedback/superadmin-feedback-page";
export default function FeedbackPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/superadmin" },
          { label: "Feedbacks" }
        ]} 
        userRole="superadmin"
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <DashboardProvider>
          <SuperadminFeedbackPage />
        </DashboardProvider>
      </div>
    </>
  );
}

