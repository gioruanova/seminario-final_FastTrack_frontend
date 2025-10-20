// Función helper para obtener la configuración de manera segura
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // En el servidor, usar valores por defecto seguros
    return process.env.NEXT_PUBLIC_API_URL_PROD || 'http://localhost:3001';
  }
  
  // En el cliente, usar los valores del entorno
  return process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" 
    ? process.env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_API_URL_PROD || 'http://localhost:3001';
};

export const config = {
  apiUrl: getApiUrl(),
};


export const slugs={
  publicApi: "publicApi",
  customersApi: "customersApi",
  superApi: "superApi",
}