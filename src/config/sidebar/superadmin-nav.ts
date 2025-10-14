import {
    Users,
    Mail,
    Shield,
    SquareCheck,
    Wrench,
    Megaphone,
    House,
    Briefcase,
    Landmark,
    Radio
} from "lucide-react";
import { NavItem, TeamData, ProjectData } from "./types";

export const superAdminNavItems: NavItem[] = [
    {
        title: "Inicio",
        url: "/dashboard/superadmin",
        icon: House,

    },
    {
        title: "Empresas",
        url: "/dashboard/superadmin/empresas",
        icon: Landmark,

    },
    {
        title: "Usuarios",
        url: "/dashboard/users",
        icon: Users,

    },
    {
        title: "Especialidades",
        url: "/admin/especialidades",
        icon: Wrench,

    },
    {
        title: "Reclamos",
        url: "/dashboard/superadmin/reclamos",
        icon: SquareCheck,
    },
    {
        title: "Clientes Recurrentes",
        url: "/dashboard/superadmin/clientes",
        icon: Briefcase,
      },



];

export const superAdminTeamData: TeamData[] = [
    {
        name: "Fast Track Admin",
        logo: Shield,
        plan: "Super Admin",
        url: "/dashboard/superadmin",
    },
];

export const superAdminProjects: ProjectData[] = [

    {
        title: "Mensajes publicos",
        url: "/admin/mensajes",
        icon: Mail,

    },
    {
        title: "Mensajes Plataforma",
        url: "/admin/mensajes-plataforma",
        icon: Radio,

    },

    {
        title: "Banner general",
        url: "/admin/banner",
        icon: Megaphone,
    },
];

