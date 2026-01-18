const getApiUrl = () => {
  // testing en prod
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev") {
    return process.env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:8888';
  }

  // re write para prod
  return '/api';
};

export const config = {
  apiUrl: getApiUrl(),
};