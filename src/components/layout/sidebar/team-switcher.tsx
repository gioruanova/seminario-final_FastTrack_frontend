"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/layout/theme/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
    url?: string;
  }[];
}) {
  const [activeTeam] = React.useState(teams[0]);
  const router = useRouter();

  if (!activeTeam) {
    return null;
  }

  const handleClick = () => {
    if (activeTeam.url) {
      router.push(activeTeam.url);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center">
        <DropdownMenu>
          <ModeToggle />
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              onClick={handleClick}
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
