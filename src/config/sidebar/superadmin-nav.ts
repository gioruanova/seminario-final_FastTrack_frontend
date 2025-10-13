import {
    Building2,
    Users,
    Mail,
    Mails,
    Shield,
    SquareCheck,
    Hammer,
    Megaphone,
} from "lucide-react";
import { NavItem, TeamData, ProjectData } from "./types";

export const superAdminNavItems: NavItem[] = [
    {
        title: "Empresas",
        url: "/admin/companies",
        icon: Building2,
        items: [
            {
                title: "Ver todas",
                url: "/admin/companies",
            },
            {
                title: "Buscar empresa",
                url: "/admin/companies/search",
            },
            {
                title: "Crear empresa",
                url: "/admin/companies/create",
            },

        ],
    },
    {
        title: "Usuarios",
        url: "/admin/users",
        icon: Users,
        items: [
            {
                title: "Ver todos",
                url: "/admin/users",
            },
            {
                title: "Ver por empresa",
                url: "/admin/users/by-company",
            },
            {
                title: "Crear usuario",
                url: "/admin/users/create",
            },

        ],
    },
    {
        title: "Especialidades",
        url: "/admin/especialidades",
        icon: Hammer,
        items: [
            {
                title: "Ver todas",
                url: "/admin/especialidades",
            },
            {
                title: "Ver por empresa",
                url: "/admin/especialidades/by-company",
            },
            {
                title: "Crear especialidad",
                url: "/admin/especialidades/create",
            },

        ],
    },
    {
        title: "Reclamos",
        url: "/admin/reclamos",
        icon: SquareCheck,
        items: [
            {
                title: "Ver reclamos",
                url: "/admin/reclamos",
            },
            {
                title: "Ver por empresa",
                url: "/admin/reclamos/by-company",
            },

        ],
    },



];

export const superAdminTeamData: TeamData[] = [
    {
        name: "Fast Track Admin",
        logo: Shield,
        plan: "Super Admin",
    },
];

export const superAdminProjects: ProjectData[] = [

    {
        title: "Mensajes publicos",
        url: "/admin/mensajes",
        icon: Mail,
        items: [
            {
                title: "Ver mensajes",
                url: "/admin/mensajes",
            },
            {
                title: "Ver Categorias",
                url: "/admin/mensajes/categories",
            },
            {
                title: "Crear Categoria",
                url: "/admin/mensajes/crear-categoria",
            },

        ],
    },
    {
        title: "Mensajes Plataforma",
        url: "/admin/mensajes-plataforma",
        icon: Mails,
        items: [
            {
                title: "Crear Mensaje global",
                url: "/admin/mensajes-plataforma",
            },
            {
                title: "Crear Mensaje empresa",
                url: "/admin/mensajes-plataforma/crear-mensaje-empresa",
            },
            {
                title: "Crear Mensaje usuario",
                url: "/admin/mensajes-plataforma/crear-mensaje-usuario",
            },


        ],
    },

    {
        title: "Banner general",
        url: "/admin/banner",
        icon: Megaphone,
    },
];

