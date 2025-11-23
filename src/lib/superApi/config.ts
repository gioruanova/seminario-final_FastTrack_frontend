import { config, slugs } from "../config";

export const SUPER_API = {

  GET_RECLAMOS: `${config.apiUrl}/${slugs.superApi}/reclamos`,

  GET_CLIENTES: `${config.apiUrl}/${slugs.superApi}/clientes-recurrentes`,
  ACTIVAR_CLIENTE: `${config.apiUrl}/${slugs.superApi}/clientes-recurrentes/unblock/{cliente_id}`,
  DESACTIVAR_CLIENTE: `${config.apiUrl}/${slugs.superApi}/clientes-recurrentes/block/{cliente_id}`,

};
