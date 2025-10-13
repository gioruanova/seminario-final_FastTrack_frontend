import {

  Mail,
  SquareCheck,
} from "lucide-react";
import { NavItem, TeamData, ProjectData } from "./types";
import { CompanyConfigData } from "@/types/company";


export const getProfesionalNavItems = (config: CompanyConfigData | null): NavItem[] => [
  {
    title: `${config?.plu_heading_reclamos}`,
    url: "/reclamos",
    icon: SquareCheck,
    isActive: true,
    items: [
      {
        title: `Ver ${config?.plu_heading_reclamos}`,
        url: "/reclamos/mis-reclamos",
      },

    ],
  },
];

export const profesionalTeamData = (companyName: string): TeamData[] => [
  {
    name: companyName,
    logo: SquareCheck,
    plan: "Profesional",
  },
];




export const profesionalProjects: ProjectData[] = [

  {
    title: "Ver Mensajes",
    url: "/owner/mensajes",
    icon: Mail,
  },

];

