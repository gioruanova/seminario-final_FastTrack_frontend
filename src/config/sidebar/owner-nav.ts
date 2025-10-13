import {
  Building2,
  Users,
  Mail,
  Hammer,
  SquareCheck,
} from "lucide-react";
import { NavItem, TeamData, ProjectData } from "./types";
import { CompanyConfigData } from "@/types/company";

export const getOwnerNavItems = (config: CompanyConfigData | null): NavItem[] => [
  {
    title: "Mi Organizacion",
    url: "/company",
    icon: Building2,
    items: [
      {
        title: "Datos Organizacion",
        url: "/company/info",
      },
      {
        title: "Configuración",
        url: "/company/settings",
      },
    ],
  },
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
  {
    title: `${config?.plu_heading_solicitante}`,
    url: "/owner/clientess",
    icon: Hammer,
    items: [
      {
        title: `Ver ${config?.plu_heading_solicitante}`,
        url: "/owner/clientes",
      },
      {
        title: `Nuevo ${config?.sing_heading_solicitante}`,
        url: "/owner/clientes/create",
      },

    ],
  },

];

export const ownerTeamData = (companyName: string): TeamData[] => [
  {
    name: companyName,
    logo: Building2,
    plan: "Owner",
  },
];

export const ownerProjects: ProjectData[] = [

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
        title: "Crear mensaje empresa",
        url: "/owner/mensajes/all",
      },
      {
        title: "Crear mensaje usuario",
        url: "/owner/mensajes/crear-mensaje-usuario",
      },

    ],
  },



];

