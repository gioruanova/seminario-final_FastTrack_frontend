import {
  Users,
  Hammer,
  Building2,
  SquareCheck,
  Mail
} from "lucide-react";
import { NavItem, TeamData, ProjectData } from "./types";
import { CompanyConfigData } from "@/types/company";

export const getOperadorNavItems = (config: CompanyConfigData | null): NavItem[] => [
  {
    title: `${config?.plu_heading_reclamos}`,
    url: "/owner/reclamos",
    icon: SquareCheck,
    items: [
      {
        title: `Ver ${config?.plu_heading_reclamos}`,
        url: "/owner/reclamos",
      },
      {
        title: `Crear ${config?.sing_heading_reclamos}`,
        url: "/owner/reclamos/create",
      },
      {
        title: `Gestionar ${config?.sing_heading_reclamos}`,
        url: "/owner/reclamos/manage",
      },
      {
        title: ` ${config?.plu_heading_reclamos} por ${config?.sing_heading_profesional}`,
        url: "/owner/reclamos/manage",
      },
      {
        title: `Buscar  ${config?.sing_heading_reclamos}`,
        url: "/owner/reclamos/buscar",
      },

    ],
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
    items: [
      {
        title: "Ver todos",
        url: "/employees",
      },
      {
        title: "Agregar Usuario",
        url: "/employees/create",
      },
    ],
  },
  {
    title: `${config?.plu_heading_especialidad}`,
    url: "/owner/especialidades",
    icon: Hammer,
    items: [
      {
        title: `Ver ${config?.plu_heading_especialidad}`,
        url: "/owner/especialidades",
      },
      {
        title: `Crear ${config?.sing_heading_especialidad}`,
        url: "/owner/especialidades/create",
      },

    ],
  },
];

export const operadorTeamData = (companyName: string): TeamData[] => [
  {
    name: companyName,
    logo: Building2,
    plan: "Operador",
  },
];

export const operadorProjects: ProjectData[] = [

  {
    title: "Mensajes",
    url: "/owner/mensajes",
    icon: Mail,
    items: [
      {
        title: "Ver mensajes",
        url: "/owner/mensajes",
      },
      {
        title: "Enviar mensaje a Empresa",
        url: "/owner/mensajes/all",
      },
      {
        title: "Enviar mensaje a Usuario",
        url: "/owner/mensajes/crear-mensaje-usuario",
      },

    ],
  },



];

