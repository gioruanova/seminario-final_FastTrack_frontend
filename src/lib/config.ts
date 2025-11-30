const getApiUrl = () => {
  // En desarrollo, usar la URL de desarrollo
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev") {
    return process.env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:8888';
  }

  // En producción, usar la URL de producción
  return process.env.NEXT_PUBLIC_API_URL_PROD || 'http://localhost:8888';
};

export const config = {
  apiUrl: getApiUrl(),
};