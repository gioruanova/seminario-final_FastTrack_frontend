import { config, slugs } from "../config";

export const SUPER_API = {
  GET_USERS: `${config.apiUrl}/${slugs.superApi}/users`, // traer todos los usuarios
  GET_COMPANIES: `${config.apiUrl}/${slugs.superApi}/companies`, // traer todas las empresas
  GET_ESPECIALIDADES: `${config.apiUrl}/${slugs.superApi}/especialidades`, // traer todas las especialidades
  GET_RECLAMOS: `${config.apiUrl}/${slugs.superApi}/reclamos`, // trae todos los reclamos
  GET_LOGS: `${config.apiUrl}/${slugs.superApi}/globalLogs`, // trae todos los logs
  
};
