import { config, slugs } from "../config";


export const CLIENT_API = {
  FEEDBACK: `${config.apiUrl}/${slugs.customersApi}/platform/feedback`, // Endpoint de feedback para users (todos menos superadmin)
  COMPANY_CONFIG: `${config.apiUrl}/${slugs.customersApi}/company/config`, // endpoint para obtener headings y algunas configuraciones
  ESTADO_PROFESIONAL: `${config.apiUrl}/${slugs.customersApi}/workload/estado`, // se obtiene el estado del profeisonal para recibir o no
  HABILITAR_FILA: `${config.apiUrl}/${slugs.customersApi}/workload/enable`, // Al ejecutar este endpoint, se cambia a true
  DESHABILITAR_FILA: `${config.apiUrl}/${slugs.customersApi}/workload/disable`, // Al ejecutar este endpoint, se cambia a false

  
};
